import pool from "@/config/db";
import redisClient from "@/config/redis";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "@/utils/sendOtpEmail";

export async function POST(req) {
  try {
    const { action, ...body } = await req.json();

    switch (action) {
      case "register":
        return registerUser(body);
      case "login":
        return loginUser(body);
      default:
        return Response.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

// ✅ **Register User**
async function registerUser({ username, email, password }) {
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
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
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
