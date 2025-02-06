import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import dotenv from "dotenv";
import pool from "@/config/db";
import redisClient from "@/config/redis";
import { sendOtpEmail } from "@/utils/sendOtpEmail";

dotenv.config();

export async function POST(req) {
  try {
    const { action, ...body } = await req.json();

    switch (action) {
      case "register":
        return registerUser(body);
      case "login":
        return loginUser(body);
      case "verify-otp":
        return verifyOtp(body);
      case "mfa-setup":
        return setupMfa(body);
      case "mfa-verify":
        return verifyMfa(body);
      case "logout":
        return logoutUser(body);
      default:
        return Response.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ message: "Internal server error", error }, { status: 500 });
  }
}

// ✅ **Register User**
async function registerUser({ username, email, password, role }) {
  try {
    const { rows } = await pool.query(`SELECT * FROM public."appUsers" WHERE "Email" = $1`, [email]);
    if (rows.length > 0) return Response.json({ message: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      FirstName: username.split(" ")[0],
      LastName: username.split(" ").slice(1).join(" "),
      CreatedDT: new Date().toISOString(),
      ModifiedDT: new Date().toISOString(),
      UserName: username,
      NormalizedUserName: username.toLowerCase().trim(),
      Email: email,
      NormalizedEmail: email.toLowerCase().trim(),
      EmailConfirmed: false,
      PasswordHash: hashedPassword,
    };

    const { rows: InsertedUser } = await pool.query(
      `INSERT INTO public."appUsers" ("FirstName", "LastName", "CreatedDT", "ModifiedDT", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING "Id", "FirstName", "LastName", "Email", "EmailConfirmed";`,
      [
        userData.FirstName,
        userData.LastName,
        userData.CreatedDT,
        userData.ModifiedDT,
        userData.UserName,
        userData.NormalizedUserName,
        userData.Email,
        userData.NormalizedEmail,
        userData.EmailConfirmed,
        userData.PasswordHash,
      ]
    );

    if (InsertedUser.length > 0) {
      const assignedRole = role || "vendor";
      const { rows: roleData } = await pool.query('SELECT "Id" FROM public."appRoles" WHERE "NormalizedName" = $1', [assignedRole]);

      if (roleData.length > 0) {
        await pool.query('INSERT INTO public."appUserRoles" ("UserId", "RoleId") VALUES ($1, $2)', [InsertedUser[0].Id, roleData[0].Id]);
      }

      const otp = crypto.randomInt(100000, 999999).toString();
      await redisClient.setEx(email, 600, otp);
      await sendOtpEmail(email, otp);

      const token = jwt.sign({ id: InsertedUser[0].Id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return Response.json({ message: "User registered", token, user: InsertedUser[0] }, { status: 201 });
    }

    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json({ message: "Registration failed", error }, { status: 500 });
  }
}

// ✅ **Login User**
async function loginUser({ email, password }) {
  try {
    const { rows } = await pool.query('SELECT * FROM public."appUsers" WHERE "Email" = $1', [email]);
    if (rows.length === 0) return Response.json({ message: "Invalid credentials" }, { status: 400 });

    const validPassword = await bcrypt.compare(password, rows[0].PasswordHash);
    if (!validPassword) return Response.json({ message: "Invalid credentials" }, { status: 400 });

    if (!rows[0].EmailConfirmed) {
      const otp = crypto.randomInt(100000, 999999).toString();
      await redisClient.setEx(email, 600, otp);
      await sendOtpEmail(email, otp);
      return Response.json({ message: "OTP sent. Please verify." }, { status: 403 });
    }

    const token = jwt.sign({ id: rows[0].Id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return Response.json({ message: "Login successful", token, user: rows[0] }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Login failed", error }, { status: 500 });
  }
}

// ✅ **Verify OTP**
async function verifyOtp({ email, otp }) {
  try {
    const storedOtp = await redisClient.get(email);
    if (!storedOtp || storedOtp !== otp) return Response.json({ message: "Invalid or expired OTP" }, { status: 400 });

    await pool.query(`UPDATE public."appUsers" SET "EmailConfirmed" = true WHERE "Email" = $1`, [email]);
    await redisClient.del(email);
    return Response.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "OTP verification failed", error }, { status: 500 });
  }
}

// ✅ **Logout User**
async function logoutUser({ email }) {
  await redisClient.del(email);
  return Response.json({ message: "Logged out successfully" }, { status: 200 });
}

// ✅ **Logout**
async function logoutUser(req, res) {
  await redisClient.del(req.body.email);
  res.json({ message: "Logged out successfully" });
}
