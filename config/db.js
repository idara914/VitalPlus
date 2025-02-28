import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Ensure self-signed certificates are allowed
const sslConfig = {
  rejectUnauthorized: false, // ✅ Allows self-signed certificates
};

// Initialize PostgreSQL pool with correct SSL settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig, // ✅ Enables SSL with self-signed certificate acceptance
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
