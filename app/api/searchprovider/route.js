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
    let userId;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.UserId;

      if (!userId) {
        return new Response(JSON.stringify({ message: "Invalid token: No UserId" }), {
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

    // 🔍 Get AgencyId from AppUser table
    const agencyResult = await pool.query(
      `SELECT "AgencyId" FROM public."AppUser" WHERE "Id" = $1`,
      [userId]
    );

    if (agencyResult.rowCount === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const agencyId = agencyResult.rows[0].AgencyId;

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

