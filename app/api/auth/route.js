import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import pool from "@/config/db";
import redisClient from "@/config/redis";
import { sendOtpEmail } from "@/utils/sendOtpEmail";

dotenv.config();

export async function POST(req) {
  try {
    console.log("🟢 API `/api/auth` called");

    const { action, ...body } = await req.json();
    console.log("🔍 Action:", action);

    switch (action) {
      case "register":
        return registerUser(body);
      case "login":
        return loginUser(body);
      case "verify-otp":
        return verifyOtp(body);
      case "logout":
        return logoutUser(body);
      default:
        console.error("❌ Invalid action received:", action);
        return new Response(
          JSON.stringify({ message: "Invalid action" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ Register User Function
async function registerUser({ username, email, password }) {
  try {
    console.log("🟢 Registering User:", email);

    const { rows } = await pool.query(
      `SELECT * FROM public."appUsers" WHERE "Email" = $1`, [email]
    );
    if (rows.length > 0) {
      console.error("❌ User already exists:", email);
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      FirstName: username.split(" ")[0] || "",
      LastName: username.split(" ").slice(1).join(" ") || "",
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
      `INSERT INTO public."appUsers" 
      ("FirstName", "LastName", "CreatedDT", "ModifiedDT", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash")
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
      console.log("✅ User Inserted Successfully:", InsertedUser[0]);

      // 🔹 Generate OTP and store it in Redis
      const otp = crypto.randomInt(100000, 999999).toString();
      console.log("🔑 OTP Generated:", otp);

      // ✅ Ensure Redis is connected before storing OTP
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }

      // ✅ Store OTP with expiration in Redis
      await redisClient.setEx(otp, 600, email); // Store OTP for 10 minutes
      console.log("📥 OTP Stored in Redis");

      // 🔹 Send OTP email
      await sendOtpEmail(email, otp);
      console.log("📧 OTP Email Sent");

      // 🔹 Generate JWT Token
      const token = jwt.sign(
        { id: InsertedUser[0].Id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return new Response(
        JSON.stringify({ message: "User registered", token, user: InsertedUser[0] }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }

    console.error("❌ Failed to insert user into DB");
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("❌ Error registering user:", error);
    return new Response(
      JSON.stringify({ message: "Registration failed", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ Verify OTP Function (NEW FIX)
// ✅ Verify OTP Function (No Email Needed)
async function verifyOtp({ otp }) {
  try {
    console.log(`🔍 Verifying OTP: ${otp}`);

    if (!otp) {
      console.error("❌ Missing OTP.");
      return new Response(
        JSON.stringify({ message: "OTP is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Ensure Redis is connected before retrieving OTP
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    // 🔹 Retrieve email using OTP from Redis
    const email = await redisClient.get(otp);
    if (!email) {
      console.error("❌ OTP Expired or Not Found.");
      return new Response(
        JSON.stringify({ message: "OTP expired or invalid." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`✅ OTP Verified for ${email}`);

    // 🔹 Mark email as verified in the database
    await pool.query(
      `UPDATE public."appUsers" SET "EmailConfirmed" = true WHERE "Email" = $1`,
      [email]
    );

    // 🔹 Delete OTP from Redis after successful verification
    await redisClient.del(otp);

    return new Response(
      JSON.stringify({ message: "OTP Verified Successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    return new Response(
      JSON.stringify({ message: "OTP verification failed.", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}




