import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Explicitly disable SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL.includes("sslmode=disable")
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL + "?sslmode=disable",
  ssl: false, // ✅ Ensure SSL is completely disabled
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
