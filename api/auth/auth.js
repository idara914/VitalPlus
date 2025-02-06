import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import pool from './../config/db.js';
import redisClient from './../config/redis.js';
import { authorize } from './../middlewares/authorize.js';
import { sendOtpEmail } from '../utils/sendOtpEmail.js';
import { otpRequestLimiter, otpVerifyLimiter } from '../middlewares/rateLimiter.js';

dotenv.config();

const router = express.Router();

// Register a new user with role
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  // try {
  // Check if the user already exists
  const { rows } = await pool.query(`SELECT * FROM public."appUsers" users WHERE users."Email" = $1`, [email]);
  if (rows.length > 0) {
    return res.status(400).json({ status: false, message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const options = {
    timeZone: 'America/New_York', // Change to desired US timezone
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);

  const userData = {
    FirstName: username.split(" ")[0],
    LastName: username.split(" ").slice(1).join(" "),
    CreatedDT: formatter.format(new Date()),
    ModifiedDT: formatter.format(new Date()),
    UserName: username,
    NormalizedUserName: username.toLowerCase().trim(),
    Email: email,
    NormalizedEmail: email.toLowerCase().trim(),
    EmailConfirmed: false,
    PasswordHash: hashedPassword
  }

  // Insert the user into the database
  const { rows: InsertedUser } = await pool.query(
    'INSERT INTO public."appUsers" ("FirstName", "LastName", "CreatedBy", "CreatedDT", "ModifiedBy", "ModifiedDT","UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING "Id", "FirstName", "LastName", "CreatedDT", "ModifiedDT", "UserName", "Email", "EmailConfirmed";',
    [userData.FirstName, userData.LastName, userData.CreatedBy, userData.CreatedDT, userData.ModifiedBy, userData.ModifiedDT, userData.UserName, userData.NormalizedUserName, userData.Email, userData.NormalizedEmail, userData.EmailConfirmed, userData.PasswordHash]
  );

  if (InsertedUser.length > 0) {
    const assignedRole = role || 'vendor';
    const { rows: roleData } = await pool.query('SELECT "Id" FROM public."appRoles" appRoles WHERE appRoles."NormalizedName" = $1', [assignedRole]);

    if (roleData.length === 0) {
      return res.status(400).json({ status: false, message: `Role '${assignedRole}' does not exist` });
    }

    const roleId = roleData[0].Id;
    await pool.query('INSERT INTO public."appUserRoles" ("UserId", "RoleId") VALUES ($1, $2)', [InsertedUser[0].Id, roleId]);

    // Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in Redis with 10 minutes expiration
    await redisClient.setEx(email, 600, otp);

    // Send OTP to the user's email
    await sendOtpEmail(email, otp);

    const token = jwt.sign({ id: InsertedUser[0].Id, user: InsertedUser[0] }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ status: true, message: 'User registered successfully', token: token, user: InsertedUser[0] });
  } else {
    res.status(201).json({ status: false, message: 'Internal Server Error' });
  }
  // } catch (error) {
  //   res.status(500).json({ status: false, message: 'Server error', error: error });
  // }
});

// Login user and send OTP
router.post('/login', otpRequestLimiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify user credentials
    const { rows } = await pool.query('SELECT * FROM public."appUsers" appUsers WHERE appUsers."Email" = $1', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ status: false, message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, rows[0].PasswordHash);
    if (!validPassword) {
      return res.status(400).json({ status: false, message: 'Invalid credentials' });
    }

    if (!rows[0].EmailConfirmed) {
      // Generate a random 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString();

      // Store OTP in Redis with 10 minutes expiration
      await redisClient.setEx(rows[0].Email, 600, otp); // 600 seconds = 10 minutes

      // Send OTP to the user's email
      await sendOtpEmail(email, otp);

      res.status(403).json({ status: false, message: 'OTP sent to your email. Please verify.' });
    } else {
      const token = jwt.sign({ id: rows[0].Id, data: rows[0] }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ status: true, token: token, user: rows[0], message: 'Login Successful.' });
    }

  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error: error });
  }
});

// Verify OTP and complete login
router.post('/verify-otp', authorize([]), async (req, res) => {

  const { otp } = req.body;

  try {
    const { rows } = await pool.query('SELECT "Id", "Email", "EmailConfirmed" FROM public."appUsers" appUsers WHERE appUsers."Id" = $1', [req.user.id]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid Credentials!' });
    }

    const storedOtp = await redisClient.get(rows[0].Email);

    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    await pool.query(
      `UPDATE public."appUsers" SET "EmailConfirmed" = true WHERE "Id" = $1;`,
      [rows[0].Id]
    );

    await redisClient.del(rows[0].Email);

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error });
  }
});

// Protected route example
router.get('/dashboard', authorize(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome to your dashboard', userId: req.user.id });
});

// 1. Generate secret for MFA setup
router.post('/mfa/setup', async (req, res) => {
  let email = req.body.email;

  const secret = speakeasy.generateSecret({ name: "Vital+: " + email });

  const { rows: updatedUser } = await pool.query(
    `UPDATE public."appUsers" SET "SecurityStamp" = $1 WHERE "Email" = $2;`,
    [secret.base32, email]
  );

  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.json({ qrCode: data_url, secret: secret.base32 });
  });
});

// 2. Verify the TOTP
router.post('/mfa/verify', async (req, res) => {
  const { email, token } = req.body;

  const { rows } = await pool.query('SELECT "Id", "Email", "SecurityStamp" FROM public."appUsers" WHERE "Email" = $1', [email]);

  if (rows.length > 0) {
    const verified = speakeasy.totp.verify({
      secret: rows[0].SecurityStamp,
      encoding: 'base32',
      token,
    });

    if (verified) {

      await pool.query(
        `UPDATE public."appUsers" SET "TwoFactorEnabled" = true WHERE "Id" = $1;`,
        [rows[0].Id]
      );

      const { rows: updatedUser } = await pool.query('SELECT "Id", "Email", "UserName", "TwoFactorEnabled", "EmailConfirmed" FROM public."appUsers" WHERE "Email" = $1', [email]);

      const token = jwt.sign({ id: updatedUser[0].Id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.json({ success: true, token, user: updatedUser[0], message: "Verification Successful" });
    } else {
      return res.status(400).json({ success: false, message: "Verification failed" });
    }
  } else {
    return res.status(400).json({ success: false, message: "Account not exist" });
  }
});

// Log Out 
router.post('/logout', authorize([]), async (req, res) => {

  const { rows } = await pool.query('SELECT "Id", "Email", "SecurityStamp" FROM public."appUsers" WHERE "Id" = $1', [req.user.id]);

  if (rows.length > 0) {
    await redisClient.del(rows[0].Email);
    return res.json({ success: true, token, user: updatedUser[0], message: "Log out Successfully" });

  } else {
    return res.status(400).json({ success: false, message: "Not Logged In" });
  }
});

export default router
