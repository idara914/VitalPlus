
import { NextResponse } from "next/server";
import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure it's in your .env
});

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      serviceTypeCode,
      placeOfService,
      eventTypeCode,
      diagnosisCode,
      procedureCodes,
      unitsRequested,
      frequency,
      startDate,
      endDate,
      priorAuthNumber,
      patientId,
      subscriberId,
      patientLastName,
      patientFirstName,
      dob,
      gender,
      providerId,
      providerNPI,
      entityCode,
      attachmentControlNumbers,
      notes,
      attachmentFilePath,
    } = body;

    const query = `
      INSERT INTO "278_Staging" (
        "AuthorizationID",
        "ServiceTypeCode",
        "PlaceOfService",
        "EventTypeCode",
        "DiagnosisCode",
        "ProcedureCodes",
        "UnitsRequested",
        "Frequency",
        "StartDate",
        "EndDate",
        "PriorAuthNumber",
        "PatientID",
        "SubscriberID",
        "PatientLastName",
        "PatientFirstName",
        "DOB",
        "Gender",
        "ProviderID",
        "ProviderNPI",
        "EntityCode",
        "AttachmentControlNumbers",
        "Notes",
        "AttachmentFilePath"
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18,
        $19, $20, $21, $22, $23
      )
    `;

    const values = [
      uuidv4(),
      serviceTypeCode,
      placeOfService,
      eventTypeCode,
      diagnosisCode,
      procedureCodes,
      unitsRequested,
      frequency,
      startDate,
      endDate,
      priorAuthNumber,
      patientId,
      subscriberId,
      patientLastName,
      patientFirstName,
      dob,
      gender,
      providerId,
      providerNPI,
      entityCode,
      attachmentControlNumbers,
      notes,
      attachmentFilePath,
    ];

    await pool.query(query, values);
    return NextResponse.json({ success: true, message: "Authorization saved." });
  } catch (err) {
    console.error("Error saving authorization:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
