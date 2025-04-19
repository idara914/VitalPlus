import pool from "@/config/db";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const data = await req.json();
    const patientId = data.patientId || uuidv4();

    // Insert or update ClinicPatient
    await pool.query(
      `INSERT INTO "ClinicPatient" (
        "Id", "FirstName", "LastName", "CreatedDT", "Gender", "DateOfBirth",
        "ContactNumber1", "FullAddress", "Status", "ZipCode", "Ethnicity",
        "LanguageSpoken", "LanguageWritten", "Relationship", "ContactNumber2",
        "State", "City"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, $17
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
        "City" = $17
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

    // Optional mock Availity coverage lookup (development only)
    const tokenRes = await axios.post(
      "https://api.availity.com/availity/v1/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AV_CLIENT_ID,
        client_secret: process.env.AV_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenRes.data.access_token;

    const mockCoverageRes = await axios.post(
      "https://api.availity.com/availity/development-partner/v1/coverages",
      new URLSearchParams({
        payerId: "60054",
        providerNpi: "1234567893",
        providerFirstName: "Test",
        providerLastName: "Provider",
        providerType: "individual",
        providerTaxId: "123456789",
        memberId: data.memberId,
        patientFirstName: data.firstName,
        patientLastName: data.lastName,
        patientBirthDate: data.dob,
        serviceType: "30",
        asOfDate: new Date().toISOString().split("T")[0]
      }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Api-Mock-Scenario-ID": "Coverages-Complete-i"
        }
      }
    );

    const coverage = mockCoverageRes.data?.plans?.[0] || {};
    const benefit = coverage.benefits?.[0] || {};

    const insuranceId = uuidv4();

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
        coverage.coverageStartDate,
        coverage.coverageEndDate,
        coverage.description,
        coverage.status,
        benefit.levelCode,
        benefit.authorizationRequired,
        benefit.copaymentAmount,
        benefit.deductibleAmount,
        benefit.outOfPocketLimit,
        coverage.planName || coverage.description,
        coverage.eligibilityStartDate,
        coverage.eligibilityEndDate,
      ]
    );

    return NextResponse.json({ status: "OK", coverage });
  } catch (error) {
    console.error("Error saving patient/insurance:", error);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}


