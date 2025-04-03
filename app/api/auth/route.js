import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import pool from "@/config/db";
import { kv } from "@vercel/kv";
import { sendOtpEmail } from "@/utils/sendOtpEmail";

dotenv.config();

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_ORIGIN || "https://www.vital-plus.xyz",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const OTP_EXPIRE = 600; // 10 minutes
const MAX_RESEND = 5;
const MAX_ATTEMPTS = 5;

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
  try {
    const { action, ...body } = await req.json();

    if (action === "register") return await registerUser(body);
    if (action === "send-otp") return await handleSendOtp(body);
    if (action === "verify-otp") {
      const { otp, token } = body;
      return await handleVerifyOtp({ otp, token });
    }

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

  await sendOtp(inserted[0].Email);

  const token = jwt.sign(
    { id: inserted[0].Id, email: inserted[0].Email },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  return new Response(
    JSON.stringify({
      message: "User registered",
      token,
    }),
    { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

async function handleSendOtp({ token }) {
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const response = await sendOtp(email);
    return new Response(JSON.stringify({ message: response.message }), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function handleVerifyOtp({ otp, token }) {
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const response = await verifyOtp(email, otp);
    return new Response(JSON.stringify({ message: response.message }), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function sendOtp(email) {
  const resendKey = `otp:resend:${email}`;
  const resendCount = parseInt(await kv.get(resendKey)) || 0;

  if (resendCount >= MAX_RESEND) {
    return { status: 429, message: "Resend limit reached. Try later." };
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  await kv.set(`otp:code:${email}`, otp, { ex: OTP_EXPIRE });
  await kv.set(`otp:attempts:${email}`, "0", { ex: OTP_EXPIRE });
  await kv.set(resendKey, (resendCount + 1).toString(), { ex: 900 });

  await sendOtpEmail(email, otp);

  return { status: 200, message: "OTP Sent" };
}

async function verifyOtp(email, otp) {
  const code = await kv.get(`otp:code:${email}`);
  let attempts = parseInt(await kv.get(`otp:attempts:${email}`)) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    return { status: 403, message: "Too many failed attempts. Try later." };
  }

  if (otp === code) {
    await kv.del(`otp:code:${email}`);
    await kv.del(`otp:attempts:${email}`);
    await kv.del(`otp:resend:${email}`);
    return { status: 200, message: "OTP Verified" };
  } else {
    attempts++;
    await kv.set(`otp:attempts:${email}`, attempts.toString(), { ex: OTP_EXPIRE });
    return { status: 400, message: "Invalid OTP" };
  }
}
