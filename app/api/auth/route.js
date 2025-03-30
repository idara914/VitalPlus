
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import pool from "@/config/db";
import redisClient from "@/config/redis";
import { sendOtpEmail } from "@/utils/sendOtpEmail";

dotenv.config();

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_ORIGIN || "https://www.vital-plus.xyz",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
  try {
    const { action, ...body } = await req.json();
    let response;

    switch (action) {
      case "register":
        response = await registerUser(body);
        break;
      case "login":
        response = await loginUser(body);
        break;
      case "verify-otp":
        response = await verifyOtp(body);
        break;
      case "resend-otp":
        response = await resendOtp(body);
        break;
      default:
        response = new Response(
          JSON.stringify({ message: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

async function registerUser({ username, email, password }) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM public."appUsers" WHERE "Email" = $1`,
      [email]
    );
    if (rows.length > 0) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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

    const { rows: inserted } = await pool.query(
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

    await generateAndSendOtp(email);

    const token = jwt.sign({ id: inserted[0].Id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(
      JSON.stringify({ message: "User registered", token, user: inserted[0] }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Registration failed", error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

async function verifyOtp({ otp }) {
  try {
    console.log(`🔍 Received OTP: ${otp}`);
    if (!otp) {
      return new Response(JSON.stringify({ message: "OTP is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!redisClient.isOpen) await redisClient.connect();
    const email = await redisClient.get(otp);

    console.log(`📥 Redis Lookup: ${email}`);

    if (!email) {
      return new Response(
        JSON.stringify({ message: "OTP expired or invalid." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await pool.query(
      `UPDATE public."appUsers" SET "EmailConfirmed" = true WHERE "Email" = $1`,
      [email]
    );
    await redisClient.del(otp);

    return new Response(
      JSON.stringify({ message: "OTP Verified Successfully!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "OTP verification failed.", error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

// ✅ Resend OTP logic
async function resendOtp({ email }) {
  try {
    console.log(`🔄 Resending OTP for: ${email}`);
    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await generateAndSendOtp(email);

    return new Response(
      JSON.stringify({ message: "OTP resent successfully." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to resend OTP.", error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

// ✅ OTP generation function used by register and resend
async function generateAndSendOtp(email) {
  const otp = crypto.randomInt(100000, 999999).toString();
  console.log(`🔑 OTP Generated: ${otp} for ${email}`);

  if (!redisClient.isOpen) await redisClient.connect();
  await redisClient.setEx(otp, 600, email); // 10 minutes expiry

  await sendOtpEmail(email, otp);
}

// Dummy stubs for login/logout
async function loginUser(body) {
  return new Response(
    JSON.stringify({ message: "Login not implemented yet" }),
    { status: 501, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function logoutUser(body) {
  return new Response(
    JSON.stringify({ message: "Logout not implemented yet" }),
    { status: 501, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}


