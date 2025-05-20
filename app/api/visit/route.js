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
      PatientId,
      AppointmentId,
      EmployeeId,
      VisitDate,              // e.g. "2024-06-01T14:00:00Z"
      VisitDuration,          // e.g. "01:00:00"
      CarePlanId,
      Location,
      Notes,
      Status,
      VisitType,
      IssuesEncountered,
      Outcome,
      TasksPerformed,         // JSON like { "cptCodes": ["G0156"], ... }
      ScheduledStart,         // ISO string
      ScheduledEnd,           // ISO string
      ActualStart,            // ISO string
      ActualEnd,              // ISO string
      IsVerified = false,
      VerifiedDate = null,
      CompanyId,
    } = body;

    const VisitId = uuidv4();
    const now = new Date().toISOString();

    await client.query("BEGIN");

    await client.query(
      `INSERT INTO public."Visits"
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
        VisitId,
        ProviderId,
        VisitDate,
        AppointmentId,
        EmployeeId,
        userId,
        now,
        PatientId,
        VisitDuration,
        CarePlanId,
        TasksPerformed,
        CompanyId,
        Status,
        VisitType,
        IssuesEncountered,
        Outcome,
        Location,
        Notes,
        IsVerified,
        VerifiedDate,
        ScheduledStart,
        ScheduledEnd,
        ActualStart,
        ActualEnd,
      ]
    );

    await client.query("COMMIT");

    return new Response(
      JSON.stringify({ message: "Visit recorded successfully", id: VisitId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Visit API Error:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    client.release();
  }
}
