// /api/insurance-companies.js
import pool from "@/config/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await pool.query(
      `SELECT "CompanyName" AS name, "PayerId" AS "payerId"
       FROM "InsuranceCompanies"
       WHERE "IsActive" = TRUE
       ORDER BY "CompanyName"`
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching insurance companies:", err);
    res.status(500).json({ error: "Failed to load insurance companies" });
  }
}
