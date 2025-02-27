import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const sslConfig =
  process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("sslmode=disable")
    ? false
    : { rejectUnauthorized: false };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig, // ✅ Fully disables SSL when needed
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
