// /app/api/insurance-companies/route.js
import pool from "@/config/db";

export async function GET(req) {
  try {
    const result = await pool.query(
      `SELECT "CompanyName" AS name, "PayerId" AS "payerId"
       FROM "InsuranceCompanies"
       WHERE "IsActive" = TRUE
       ORDER BY "CompanyName"`
    );

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching insurance companies:", err);
    return new Response(JSON.stringify({ error: "Failed to load insurance companies" }), {
      status: 500,
    });
  }
}
