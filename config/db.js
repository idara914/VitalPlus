import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Enable SSL for production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // ✅ Allows self-signed certificates
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
