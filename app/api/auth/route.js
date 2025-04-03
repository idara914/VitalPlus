import crypto from "crypto";
import jwt from "jsonwebtoken";
import redisClient from "@/config/redis";
import { sendOtpEmail } from "@/utils/sendOtpEmail";

const OTP_EXPIRE = 600; // 10 minutes
const MAX_RESEND = 5;
const MAX_ATTEMPTS = 5;

export async function POST(req) {
  const { action, email, otp, token } = await req.json();
  if (action === "send-otp") return await sendOtp(email);
  if (action === "verify-otp") return await verifyOtp(email, otp);
  return new Response(JSON.stringify({ message: "Invalid action" }), { status: 400 });
}

async function sendOtp(email) {
  const resendKey = `otp:resend:${email}`;
  let resendCount = parseInt(await redisClient.get(resendKey)) || 0;

  if (resendCount >= MAX_RESEND) {
    return new Response(JSON.stringify({ message: "Resend limit reached. Try later." }), { status: 429 });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  await redisClient.setEx(`otp:code:${email}`, OTP_EXPIRE, otp);
  await redisClient.setEx(`otp:attempts:${email}`, OTP_EXPIRE, "0");
  await redisClient.setEx(resendKey, 900, (resendCount + 1).toString());

  await sendOtpEmail(email, otp);
  return new Response(JSON.stringify({ message: "OTP Sent" }), { status: 200 });
}

async function verifyOtp(email, otp) {
  const code = await redisClient.get(`otp:code:${email}`);
  let attempts = parseInt(await redisClient.get(`otp:attempts:${email}`)) || 0;

  if (attempts >= MAX_ATTEMPTS) {
    return new Response(JSON.stringify({ message: "Too many failed attempts. Try later." }), { status: 403 });
  }

  if (otp === code) {
    await redisClient.del(`otp:code:${email}`);
    await redisClient.del(`otp:attempts:${email}`);
    return new Response(JSON.stringify({ message: "OTP Verified" }), { status: 200 });
  } else {
    attempts++;
    await redisClient.setEx(`otp:attempts:${email}`, OTP_EXPIRE, attempts.toString());
    return new Response(JSON.stringify({ message: "Invalid OTP" }), { status: 400 });
  }
}
