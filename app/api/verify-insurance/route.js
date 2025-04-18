// /pages/api/verify-insurance.js
import axios from "axios";
 import db from "../../../lib/db";
 // adjust if using a different database utility
import { decode } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { insuranceCompanyName, memberId } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Unauthorized - no token provided" });

    const decoded = decode(token);
    const agencyId = decoded?.agencyId;
    if (!agencyId) return res.status(400).json({ error: "Missing agency ID in token" });

    // 1. Get the agency's NPI
    const agency = await db.agency.findFirst({
      where: { id: agencyId },
      select: { npi: true }
    });
    if (!agency || !agency.npi) return res.status(400).json({ error: "Agency NPI not found" });

    // 2. Get the payer ID from the insurance company name
    const company = await db.insuranceCompanies.findFirst({
      where: { name: insuranceCompanyName },
      select: { payerId: true }
    });
    if (!company || !company.payerId) return res.status(400).json({ error: "Payer ID not found for insurance company" });

    // 3. Get OAuth token from Availity
    const tokenRes = await axios.post(
      process.env.AV_TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AV_CLIENT_ID,
        client_secret: process.env.AV_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenRes.data.access_token;

    // 4. Send coverage verification request
    const coverageRes = await axios.post(
      process.env.AV_COVERAGES_URL,
      {
        payerId: company.payerId,
        providerNpi: agency.npi,
        memberId,
        patientFirstName: "Jane", // replace with actual value from frontend
        patientLastName: "Doe",
        patientBirthDate: "1985-06-15",
        serviceType: ["30"]
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Api-Mock-Scenario-ID": "Coverages-Complete-i" // for dev only
        }
      }
    );

    return res.status(200).json(coverageRes.data);
  } catch (err) {
    console.error("Verification error:", err.response?.data || err);
    return res.status(500).json({ error: "Insurance verification failed" });
  }
}
