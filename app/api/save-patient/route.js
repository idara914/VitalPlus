import pool from "@/config/db";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const id = uuidv4(); // UUID for Id column
    const insuranceId = uuidv4();

    // Insert or update ClinicPatient
    await pool.query(
      `INSERT INTO "ClinicPatient" (
        "Id", "ZZno", "FirstName", "LastName", "CreatedDT", "Gender", "DateOfBirth",
        "ContactNumber1", "FullAddress", "Status", "ZipCode", "Ethnicity",
        "LanguageSpoken", "LanguageWritten", "Race", "EmergencyContactName",
        "Relationship", "ContactNumber2", "State", "City", "IsActive"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, TRUE
      )
      ON CONFLICT ("Id") DO UPDATE SET
        "ZZno" = $2,
        "FirstName" = $3,
        "LastName" = $4,
        "CreatedDT" = $5,
        "Gender" = $6,
        "DateOfBirth" = $7,
        "ContactNumber1" = $8,
        "FullAddress" = $9,
        "Status" = $10,
        "ZipCode" = $11,
        "Ethnicity" = $12,
        "LanguageSpoken" = $13,
        "LanguageWritten" = $14,
        "Race" = $15,
        "EmergencyContactName" = $16,
        "Relationship" = $17,
        "ContactNumber2" = $18,
        "State" = $19,
        "City" = $20,
        "IsActive" = TRUE
      `,
      [
        id,
        data.ZZno, // SSN
        data.firstName,
        data.lastName,
        data.startOfCareDate,
        data.gender,
        data.dob,
        data.contact,
        data.address,
        data.status,
        data.zip || data.zipCode,
        data.ethnicity,
        data.languageSpoken,
        data.languageWritten,
        data.race,
        data.emergencyContactName,
        data.relationship,
        data.secondaryPhysicianNumber,
        data.state,
        data.city,
      ]
    );

    // Only insert into Clinical_PatientInsurances if all fields are filled
    const insuranceRequiredFields = [
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
    ];

    const hasInsuranceData = insuranceRequiredFields.every(
      (field) => field !== undefined && field !== null && field !== ""
    );

    if (hasInsuranceData) {
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
          id, // Link back to ClinicPatient
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
    }

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("Error saving patient/insurance:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
