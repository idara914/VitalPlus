import pool from "@/config/db";

export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT "Id", "FirstName", "LastName"
      FROM public."ClinicPatient"
      WHERE "IsActive" = true AND "IsDeleted" = false
    `);

    const patients = result.rows.map(p => ({
      label: `${p.FirstName} ${p.LastName}`,
      value: p.Id,
    }));

    return new Response(JSON.stringify(patients), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("🔴 Error fetching ClinicPatient:", err);
    return new Response(JSON.stringify({ message: "Failed to fetch patients" }), {
      status: 500,
    });
  } finally {
    client.release();
  }
}
