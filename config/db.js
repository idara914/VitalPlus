import pg from 'pg'
import dotenv from 'dotenv';  

dotenv.config();

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

export default pool;
