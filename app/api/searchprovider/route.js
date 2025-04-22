"use server";

import pool from "@/config/db";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new Response(JSON.stringify({ message: "Missing auth token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.split(" ")[1];
    let agencyId;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // replace with your secret
      agencyId = decoded.AgencyId;

      if (!agencyId) {
        return new Response(JSON.stringify({ message: "Invalid token: No AgencyId" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (err) {
      console.error("JWT error:", err);
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const {
      firstName,
      lastName,
      middleName,
      speciality,
      npi,
      dob,
      providerCode,
    } = body;

    const filters = [`"AgencyId" = $1`];
    const values = [agencyId];
    let paramIndex = 2;

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

    const whereClause = `WHERE ${filters.join(" AND ")}`;

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

