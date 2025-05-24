import pool from "@/config/db";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const client = await pool.connect();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { rows } = await client.query(
      `SELECT "CompanyId" FROM public."appUsers" WHERE "Id" = $1 LIMIT 1`,
      [userId]
    );
    const companyId = rows[0]?.CompanyId;

    if (!companyId) {
      return new Response(
        JSON.stringify({ message: "Company ID not found for user." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const {
      ProviderId,
      patientId,
      appointmentid,
      employeeid,
      visitdate,
      visitduration,
      careplanid,
      notes,
      status,
      visittype,
      issuesencountered,
      outcome,
      tasksperformed,
      scheduledstart,
      scheduledend,
      actualstart,
      actualend,
      isverified = false,
      verifieddate = null,
      hcpcs,
      AddressLine1,
      AddressLine2,
      City,
      State,
      ZipCode,
      Latitude,
      Longitude,
    } = body;

    const id = uuidv4();
    const now = new Date().toISOString();

    await client.query("BEGIN");

 await client.query(
  `INSERT INTO public."Clinical_Visit"
    ("id", "providerid", "visitdate", "appointmentid", "employeeid", "createdby", "createddt",
     "modifiedby", "modifieddt", "patientid", "visitduration", "careplanid", "tasksperformed",
     "companyid", "isactive", "isdeleted", "status", "visittype", "issuesencountered",
     "outcome", "notes", "isverified", "verifieddate", 
     "scheduledstart", "scheduledend", "actualstart", "actualend", "hcpcs",
     "AddressLine1", "AddressLine2", "City", "State", "ZipCode", "Latitude", "Longitude")
  VALUES
    ($1, $2, $3, $4, $5, $6, $7,
     $8, $9, $10, $11, $12, $13,
     $14, $15, $16, $17, $18, $19,
     $20, $21, $22, $23, $24,
     $25, $26, $27, $28, $29,
     $30, $31, $32, $33, $34, $35)`,
  [
    id,             // $1
    ProviderId,     // $2
    visitdate,      // $3
    appointmentid,  // $4
    employeeid,     // $5
    userId,         // $6 → createdby
    now,            // $7 → createddt
    userId,         // $8 → modifiedby
    now,            // $9 → modifieddt
    patientId,      // $10
    visitduration,  // $11
    careplanid,     // $12
    tasksperformed, // $13
    companyId,      // $14
    true,           // $15 → isactive
    false,          // $16 → isdeleted
    status,         // $17
    visittype,      // $18
    issuesencountered, // $19
    outcome,        // $20
    notes,          // $21
    isverified,     // $22
    verifieddate,   // $23
    scheduledstart, // $24
    scheduledend,   // $25
    actualstart,    // $26
    actualend,      // $27
    hcpcs,          // $28
    AddressLine1,   // $29
    AddressLine2,   // $30
    City,           // $31
    State,          // $32
    ZipCode,        // $33
    Latitude,       // $34
    Longitude       // $35
  ]
);

    await client.query("COMMIT");

    return new Response(
      JSON.stringify({ message: "Visit recorded successfully", id }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("🔴 Clinical_Visit API Error:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    client.release();
  }
}


