import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// ✅ Force Node.js to trust self-signed certificates globally
console.warn("⚠️ Warning: NODE_TLS_REJECT_UNAUTHORIZED is disabled in development mode.");

const { Pool } = pg;

// Force PostgreSQL SSL but allow self-signed certs
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // ✅ Fixes "DEPTH_ZERO_SELF_SIGNED_CERT"
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
