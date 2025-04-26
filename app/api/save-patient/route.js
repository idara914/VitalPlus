import pool from "@/config/db";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const id = uuidv4(); // UUID for ClinicPatient.Id
    const insuranceId = uuidv4();
    const now = new Date();

    // Default values
    // Default values
let isCoverageVerified = false;
let coverageVerifiedDate = null;
let hasAuthorization = false;
let eligibilityStatus = "Pending";
let verificationNotes = data.verificationNotes || null; // Availity notes if available

try {
  if (data.coverageStartDate && data.coverageEndDate) {
    const coverageStart = new Date(data.coverageStartDate);
    const coverageEnd = new Date(data.coverageEndDate);

    if (now >= coverageStart && now <= coverageEnd) {
      isCoverageVerified = true;
      coverageVerifiedDate = now;
    }

    if (now >= coverageStart && now <= coverageEnd) {
      eligibilityStatus = "Active";
    } else if (now > coverageEnd) {
      eligibilityStatus = "Expired";
    } else {
      eligibilityStatus = "Inactive"; // Optional fallback if before start
    }
  } else {
    eligibilityStatus = "Pending"; // No dates provided
  }

  hasAuthorization = data.authorizationRequired === true;
} catch (error) {
  console.error("Error determining insurance status:", error);
  eligibilityStatus = "Error"; // 🚨 If error calculating, mark it as "Error"
}

    // Determine based on insurance fields
    if (data.coverageStartDate && data.coverageEndDate) {
      const coverageStart = new Date(data.coverageStartDate);
      const coverageEnd = new Date(data.coverageEndDate);

      if (now >= coverageStart && now <= coverageEnd) {
        isCoverageVerified = true;
        coverageVerifiedDate = now;
      } else {
        isCoverageVerified = false;
        coverageVerifiedDate = null;
      }

      if (now >= coverageStart && now <= coverageEnd) {
        eligibilityStatus = "Active";
      } else if (now > coverageEnd) {
        eligibilityStatus = "Expired";
      } else {
        eligibilityStatus = "Inactive"; // Optional fallback if before start
      }
    } else {
      eligibilityStatus = "Pending"; // No insurance dates = pending
    }

    // Authorization
    hasAuthorization = data.authorizationRequired === true;

    // Insert into ClinicPatient
    await pool.query(
  `INSERT INTO "ClinicPatient" (
    "Id", "ZZno", "FirstName", "LastName", "CreatedDT", "Gender", "DOB",
    "ContactNumber1", "FullAddress", "Status", "ZipCode", "Ethnicity",
    "LanguageSpoken", "LanguageWritten", "Race", "EmergencyContactName",
    "Relationship", "ContactNumber2", "State", "City", "IsActive",
    "IsCoverageVerified", "CoverageVerifiedDate", "HasAuthorization", "EligibilityStatus", "VerificationNotes"
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
    $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
    $21, $22, $23, $24, $25, $26
  )
  ON CONFLICT ("Id") DO UPDATE SET
    "ZZno" = $2,
    "FirstName" = $3,
    "LastName" = $4,
    "CreatedDT" = $5,
    "Gender" = $6,
    "DOB" = $7,
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
    "IsActive" = $21,
    "IsCoverageVerified" = $22,
    "CoverageVerifiedDate" = $23,
    "HasAuthorization" = $24,
    "EligibilityStatus" = $25,
    "VerificationNotes" = $26
  `,
  [
    id,
    data.ZZno,
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
    data.contact, // Emergency contact phone (instead of secondaryPhysicianNumber)
    data.state,
    data.city,
    true, // IsActive = TRUE
    isCoverageVerified,
    coverageVerifiedDate,
    hasAuthorization,
    eligibilityStatus,
    verificationNotes,
  ]
);


    // Insert into Clinical_PatientInsurances if insurance fields filled
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
          id, // Foreign key
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
