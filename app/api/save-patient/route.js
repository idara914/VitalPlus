import pool from "@/config/db";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const patientId = data.patientId || uuidv4();
    const insuranceId = uuidv4();

    // Insert or update ClinicPatient
    await pool.query(
      `INSERT INTO "ClinicPatient" (
        "Id", "FirstName", "LastName", "CreatedDT", "Gender", "DateOfBirth",
        "ContactNumber1", "FullAddress", "Status", "ZipCode", "Ethnicity",
        "LanguageSpoken", "LanguageWritten", "Relationship", "ContactNumber2",
        "State", "City", "IsActive"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, $17, TRUE
      )
      ON CONFLICT ("Id") DO UPDATE SET
        "FirstName" = $2,
        "LastName" = $3,
        "CreatedDT" = $4,
        "Gender" = $5,
        "DateOfBirth" = $6,
        "ContactNumber1" = $7,
        "FullAddress" = $8,
        "Status" = $9,
        "ZipCode" = $10,
        "Ethnicity" = $11,
        "LanguageSpoken" = $12,
        "LanguageWritten" = $13,
        "Relationship" = $14,
        "ContactNumber2" = $15,
        "State" = $16,
        "City" = $17,
        "IsActive" = TRUE
      `,
      [
        patientId,
        data.firstName,
        data.lastName,
        data.startOfCareDate,
        data.gender,
        data.dob,
        data.contact,
        data.address,
        data.status,
        data.zip || data.zipCode,
        data.ethicity,
        data.languageSpoken,
        data.languageWritten,
        data.relationship,
        data.secondaryPhysicianNumber,
        data.state,
        data.city,
      ]
    );

    // Insert or update Clinical_PatientInsurances
    await pool.query(
      `INSERT INTO "Clinical_PatientInsurances" (
        "Id", "PatientId", "CoverageStartDate", "CoverageEndDate", "CoverageDetails",
        "CoverageStatus", "CoverageLevelCode", "authorizationRequired", "CoPayAmount",
        "DeductibleAmount", "OutOfPocketLimit", "PlanName", "EligibilityStartDate", "EligibilityEndDate"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      )
      ON CONFLICT ("PatientId") DO UPDATE SET
        "CoverageStartDate" = $3,
        "CoverageEndDate" = $4,
        "CoverageDetails" = $5,
        "CoverageStatus" = $6,
        "CoverageLevelCode" = $7,
        "authorizationRequired" = $8,
        "CoPayAmount" = $9,
        "DeductibleAmount" = $10,
        "OutOfPocketLimit" = $11,
        "PlanName" = $12,
        "EligibilityStartDate" = $13,
        "EligibilityEndDate" = $14
      `,
      [
        insuranceId,
        patientId,
        data.coverageStartDate,
        data.coverageEndDate,
        data.coverageDetails,
        data.coverageStatus,
        data.coverageLevelCode,
        data.authorizationRequired,
        data.copayAmount,
        data.deductibleAmount,
        data.outOfPocketLimit,
        data.planName,
        data.eligibilityStartDate,
        data.eligibilityEndDate,
      ]
    );

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("Error saving patient/insurance:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}

