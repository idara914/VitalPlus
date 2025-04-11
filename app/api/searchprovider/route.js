"use server";

import pool from "@/config/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      middleName,
      speciality,
      npi,
      dob,
      providerCode,
    } = body;

    const filters = [];
    const values = [];
    let paramIndex = 1;

    if (firstName) {
      filters.push(`"FirstName" ILIKE $${paramIndex++}`);
      values.push(`%${firstName}%`);
    }
    if (lastName) {
      filters.push(`"LastName" ILIKE $${paramIndex++}`);
      values.push(`%${lastName}%`);
    }
    if (middleName) {
      filters.push(`"MiddleInitial" ILIKE $${paramIndex++}`);
      values.push(`%${middleName}%`);
    }
    if (speciality) {
      filters.push(`"Remarks" ILIKE $${paramIndex++}`);
      values.push(`%${speciality}%`);
    }
    if (npi) {
      filters.push(`"Code" ILIKE $${paramIndex++}`);
      values.push(`%${npi}%`);
    }
    if (dob) {
      filters.push(`"DOB" = $${paramIndex++}`);
      values.push(dob);
    }
    if (providerCode) {
      filters.push(`"ServiceProviderCode" ILIKE $${paramIndex++}`);
      values.push(`%${providerCode}%`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    const query = `
      SELECT "Id", "FirstName", "LastName", "MiddleInitial", "DOB", "Remarks", "Code", "ServiceProviderCode"
      FROM public."ServiceProvider"
      ${whereClause}
      ORDER BY "LastName", "FirstName"
      LIMIT 50;
    `;

    const { rows } = await pool.query(query, values);

    return new Response(JSON.stringify({ results: rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("🔴 Provider search error:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
