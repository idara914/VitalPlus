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

    const body = await req.json();

    const {
      ProviderId,
      patientId,
      appointmentid,
      employeeid,
      visitdate,
      visitduration,          // e.g. "01:00:00"
      careplanid,
      location,
      notes,
      status,
      visittype,
      issuesencountered,
      outcome,
      tasksperformed,         // JSONB object
      companyid,
      scheduledstart,
      scheduledend,
      actualstart,
      actualend,
      isverified = false,
      verifieddate = null,
    } = body;

    const id = uuidv4();
    const now = new Date().toISOString();

    await client.query("BEGIN");

    await client.query(
      `INSERT INTO public."Clinical_Visit"
      ("id", "providerid", "visitdate", "appointmentid", "employeeid", "createdby", "createddt",
       "modifiedby", "modifieddt", "patientid", "visitduration", "careplanid", "tasksperformed",
       "companyid", "isactive", "isdeleted", "status", "visittype", "issuesencountered",
       "outcome", "location", "notes", "isverified", "verifieddate", 
       "scheduledstart", "scheduledend", "actualstart", "actualend")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7,
       $6, $7, $8, $9, $10, $11,
       $12, true, false, $13, $14, $15,
       $16, $17, $18, $19, $20,
       $21, $22, $23, $24)`,
      [
        id,
        ProviderId,
        visitdate,
        appointmentid,
        employeeid,
        userId,
        now,
        patientId,
        visitduration,
        careplanid,
        tasksperformed,
        companyid,
        status,
        visittype,
        issuesencountered,
        outcome,
        location,
        notes,
        isverified,
        verifieddate,
        scheduledstart,
        scheduledend,
        actualstart,
        actualend,
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

