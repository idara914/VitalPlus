// /pages/api/verify-insurance.js
import axios from "axios";
import pool from "@/config/db";
import { decode } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const {
      insuranceCompanyName,
      memberId,
      patientFirstName,
      patientLastName,
      patientBirthDate
    } = req.body;

    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthorized - no token provided" });

    const decoded = decode(token);
    const agencyId = decoded?.agencyId;
    if (!agencyId) return res.status(400).json({ error: "Missing agency ID in token" });

    const agencyResult = await pool.query(
      `SELECT npi, provider_first_name AS "providerFirstName", provider_last_name AS "providerLastName", provider_type AS "providerType", tax_id AS "taxId"
       FROM agency WHERE id = $1 LIMIT 1`,
      [agencyId]
    );
    const agency = agencyResult.rows[0];
    if (!agency || !agency.npi) return res.status(400).json({ error: "Agency NPI not found" });

    const companyResult = await pool.query(
      `SELECT payer_id AS "payerId" FROM insurance_companies WHERE name = $1 LIMIT 1`,
      [insuranceCompanyName]
    );
    const company = companyResult.rows[0];
    if (!company || !company.payerId) return res.status(400).json({ error: "Payer ID not found for insurance company" });

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

    const requestPayload = new URLSearchParams({
      payerId: company.payerId,
      providerNpi: agency.npi,
      providerFirstName: agency.providerFirstName || "Test",
      providerLastName: agency.providerLastName || "Provider",
      providerType: agency.providerType || "individual",
      providerTaxId: agency.taxId || "123456789",
      memberId,
      patientFirstName,
      patientLastName,
      patientBirthDate,
      serviceType: "30",
      asOfDate: new Date().toISOString()
    });

    const coverageRes = await axios.post(
      "https://api.availity.com/availity/development-partner/v1/coverages",
      requestPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    // Optional: save response to DB (example table: insurance_verification_logs)
    await pool.query(
      `INSERT INTO insurance_verification_logs (
        agency_id, payer_id, member_id, patient_first_name, patient_last_name, birth_date, request_payload, response_payload, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [
        agencyId,
        company.payerId,
        memberId,
        patientFirstName,
        patientLastName,
        patientBirthDate,
        requestPayload.toString(),
        JSON.stringify(coverageRes.data)
      ]
    );

    return res.status(200).json(coverageRes.data);
  } catch (err) {
    console.error("Availity Coverage API error:", err.response?.data || err);
    return res.status(500).json({ error: "Insurance verification failed" });
  }
}

