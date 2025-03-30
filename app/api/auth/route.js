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
    if (action === "register") return await registerUser(body);
    if (action === "verify-otp") return await verifyOtp(body);

    return new Response(JSON.stringify({ message: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function registerUser({ username, email, password }) {
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
    RETURNING "Id", "Email";`,
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

  const otp = crypto.randomInt(100000, 999999).toString();
  if (!redisClient.isOpen) await redisClient.connect();
  await redisClient.setEx(`otp:${otp}`, 600, inserted[0].Email);

  await sendOtpEmail(email, otp);

  const token = jwt.sign(
    { id: inserted[0].Id, email },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  return new Response(
    JSON.stringify({ message: "User registered", token }),
    { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function verifyOtp({ otp, token }) {
  if (!otp || !token) {
    return new Response(JSON.stringify({ message: "OTP and token required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if (!redisClient.isOpen) await redisClient.connect();
    const redisEmail = await redisClient.get(`otp:${otp}`);

    if (!redisEmail || redisEmail !== email) {
      return new Response(JSON.stringify({ message: "OTP expired or invalid" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await pool.query(
      `UPDATE public."appUsers" SET "EmailConfirmed" = true WHERE "Email" = $1`,
      [email]
    );
    await redisClient.del(`otp:${otp}`);

    return new Response(
      JSON.stringify({ message: "OTP Verified Successfully!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "OTP verification failed", error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

