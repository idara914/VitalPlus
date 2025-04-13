"use server";
import pool from "@/config/db";

export async function POST(req) {
  try {
    const {
      firstName,
      lastName,
      middleName,
      clinicPatientCode,
      phone,
      dob,
      zip,
      isActive,
    } = await req.json();

    const filters = [];
    const values = [];
    let idx = 1;

    if (firstName) {
      filters.push(`"FirstName" ILIKE $${idx++}`);
      values.push(`%${firstName}%`);
    }
    if (lastName) {
      filters.push(`"LastName" ILIKE $${idx++}`);
      values.push(`%${lastName}%`);
    }
    if (middleName) {
      filters.push(`"MiddleInitial" ILIKE $${idx++}`);
      values.push(`%${middleName}%`);
    }
    if (clinicPatientCode) {
      filters.push(`"ClinicPatientCode" ILIKE $${idx++}`);
      values.push(`%${clinicPatientCode}%`);
    }
    if (phone) {
      filters.push(`"PhoneNumber" ILIKE $${idx++}`);
      values.push(`%${phone}%`);
    }
    if (dob) {
      filters.push(`"DOB" = $${idx++}`);
      values.push(dob);
    }
    if (zip) {
      filters.push(`"ZipCode" ILIKE $${idx++}`);
      values.push(`%${zip}%`);
    }
    if (isActive !== "") {
      filters.push(`"IsActive" = $${idx++}`);
      values.push(isActive === "true");
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    const query = `
      SELECT "Id", "FirstName", "LastName", "MiddleInitial", "DOB", "PhoneNumber", "ZipCode", "ClinicPatientCode", "IsActive"
      FROM public."ClinicPatient"
      ${whereClause}
      ORDER BY "LastName", "FirstName"
      LIMIT 50;
    `;

    const { rows } = await pool.query(query, values);

    return new Response(JSON.stringify({ results: rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🔴 Member search error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
