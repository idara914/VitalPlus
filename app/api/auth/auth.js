import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import pool from "../../config/db"; // Adjust path if needed
import redisClient from "../../config/redis";
import { sendOtpEmail } from "../../utils/sendOtpEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { action } = req.query;

  switch (action) {
    case "register":
      return registerUser(req, res);
    case "login":
      return loginUser(req, res);
    case "verify-otp":
      return verifyOtp(req, res);
    case "mfa-setup":
      return setupMfa(req, res);
    case "mfa-verify":
      return verifyMfa(req, res);
    case "logout":
      return logoutUser(req, res);
    default:
      return res.status(400).json({ message: "Invalid action" });
  }
}

// ✅ **Register User**
async function registerUser(req, res) {
  const { username, email, password, role } = req.body;

  try {
    const { rows } = await pool.query(`SELECT * FROM public."appUsers" WHERE "Email" = $1`, [email]);
    if (rows.length > 0) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows: insertedUser } = await pool.query(
      `INSERT INTO public."appUsers" ("UserName", "Email", "PasswordHash", "EmailConfirmed") 
       VALUES ($1, $2, $3, $4) RETURNING "Id", "Email", "EmailConfirmed"`,
      [username, email, hashedPassword, false]
    );

    const userId = insertedUser[0].Id;
    const assignedRole = role || "vendor";
    const { rows: roleData } = await pool.query('SELECT "Id" FROM public."appRoles" WHERE "NormalizedName" = $1', [assignedRole]);

    if (roleData.length > 0) {
      await pool.query('INSERT INTO public."appUserRoles" ("UserId", "RoleId") VALUES ($1, $2)', [userId, roleData[0].Id]);
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    await redisClient.setEx(email, 600, otp);
    await sendOtpEmail(email, otp);

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered", token, user: insertedUser[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
}

// ✅ **Login User**
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM public."appUsers" WHERE "Email" = $1', [email]);
    if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, rows[0].PasswordHash);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    if (!rows[0].EmailConfirmed) {
      const otp = crypto.randomInt(100000, 999999).toString();
      await redisClient.setEx(email, 600, otp);
      await sendOtpEmail(email, otp);
      return res.status(403).json({ message: "OTP sent. Please verify." });
    }

    const token = jwt.sign({ id: rows[0].Id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token, user: rows[0] });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Login failed", error });
  }
}

// ✅ **Verify OTP**
async function verifyOtp(req, res) {
  const { otp, email } = req.body;

  try {
    const storedOtp = await redisClient.get(email);
    if (!storedOtp || storedOtp !== otp) return res.status(400).json({ message: "Invalid or expired OTP" });

    await pool.query(`UPDATE public."appUsers" SET "EmailConfirmed" = true WHERE "Email" = $1`, [email]);
    await redisClient.del(email);
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error });
  }
}

// ✅ **Multi-Factor Authentication Setup**
async function setupMfa(req, res) {
  const { email } = req.body;

  const secret = speakeasy.generateSecret({ name: `Vital+: ${email}` });
  await pool.query(`UPDATE public."appUsers" SET "SecurityStamp" = $1 WHERE "Email" = $2`, [secret.base32, email]);

  qrcode.toDataURL(secret.otpauth_url, (err, qrCode) => {
    res.json({ qrCode, secret: secret.base32 });
  });
}

// ✅ **Verify MFA**
async function verifyMfa(req, res) {
  const { email, token } = req.body;

  const { rows } = await pool.query('SELECT "SecurityStamp" FROM public."appUsers" WHERE "Email" = $1', [email]);
  if (rows.length === 0) return res.status(400).json({ message: "User not found" });

  const verified = speakeasy.totp.verify({ secret: rows[0].SecurityStamp, encoding: "base32", token });
  if (!verified) return res.status(400).json({ message: "Invalid MFA token" });

  await pool.query(`UPDATE public."appUsers" SET "TwoFactorEnabled" = true WHERE "Email" = $1`, [email]);
  res.json({ message: "MFA verified successfully" });
}

// ✅ **Logout**
async function logoutUser(req, res) {
  await redisClient.del(req.body.email);
  res.json({ message: "Logged out successfully" });
}
