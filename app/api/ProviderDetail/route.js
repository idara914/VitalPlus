import pool from "@/config/db";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { rows } = await pool.query(
      `SELECT "Id", "FirstName", "LastName", "DOB", "Email", "PhoneNumber", "ServiceProviderCode", "EffOt", "TermOt", "IsActive"
       FROM public."ServiceProvider" WHERE "Id" = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching provider:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
