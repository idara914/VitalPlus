import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "@/config/db";

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
    if (action === "login") return await loginUser(body);

    return new Response(JSON.stringify({ message: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AUTH API ERROR:", error);
    return new Response(JSON.stringify({ message: error.message || "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function registerUser({ username, email, password }) {
  if (!username || !email || !password) {
    return errorResponse("Username, email, and password are required", 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  const { rows } = await pool.query(
    `SELECT * FROM public."appUsers" WHERE "NormalizedEmail" = $1`,
    [normalizedEmail]
  );

  if (rows.length > 0) {
    return errorResponse("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    FirstName: username.split(" ")[0] || "",
    LastName: username.split(" ").slice(1).join(" ") || "",
    CreatedDT: new Date().toISOString(),
    ModifiedDT: new Date().toISOString(),
    UserName: username,
    NormalizedUserName: username.toLowerCase().trim(),
    Email: normalizedEmail,
    NormalizedEmail: normalizedEmail,
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

  const token = generateToken(inserted[0].Id, inserted[0].Email);
  const cookieHeader = getCookieHeader(token);

  return new Response(
    JSON.stringify({
      message: "User registered",
      token,
      userId: inserted[0].Id,
      email: inserted[0].Email,
    }),
    {
      status: 201,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Set-Cookie": cookieHeader,
      },
    }
  );
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    return errorResponse("Email and password are required", 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  const { rows } = await pool.query(
    `SELECT * FROM public."appUsers" WHERE "NormalizedEmail" = $1`,
    [normalizedEmail]
  );

  if (rows.length === 0) {
    return errorResponse("Invalid credentials", 401);
  }

  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.PasswordHash);

  if (!isMatch) {
    return errorResponse("Invalid credentials", 401);
  }

  const token = generateToken(user.Id, user.Email);
  const cookieHeader = getCookieHeader(token);

  return new Response(
    JSON.stringify({
      message: "Login successful",
      token, // ✅ token in response body
      user: {
        id: user.Id,
        email: user.Email,
        username: user.UserName,
      },
    }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Set-Cookie": cookieHeader, // ✅ cookie set too
      },
    }
  );
}

function generateToken(id, email) {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function getCookieHeader(token) {
  return `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`;
}

function errorResponse(message, status = 500) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

