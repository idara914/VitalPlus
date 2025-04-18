// /api/insurance-companies.js
+ import db from "../../../lib/db";
 // adjust for your actual DB utility

export default async function handler(req, res) {
  try {
    const companies = await db.insuranceCompanies.findMany({
      select: { name: true, payerId: true },
      where: { isActive: true },
    });
    res.status(200).json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load insurance companies" });
  }
}
