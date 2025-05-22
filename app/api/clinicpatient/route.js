import pool from "@/config/db";

export async function GET(req) {
  const client = await pool.connect();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  try {
    const result = await client.query(`
      SELECT "Id", "FirstName", "LastName", "MiddleName"
      FROM public."ClinicPatient"
      WHERE "IsActive" = true
        AND "IsDeleted" = false
        AND (
          "FirstName" ILIKE $1 OR
          "LastName" ILIKE $1 OR
          "MiddleName" ILIKE $1
        )
      LIMIT 20
    `, [`%${search}%`]);

    const patients = result.rows.map(p => ({
      label: `${p.FirstName} ${p.MiddleName ? p.MiddleName + " " : ""}${p.LastName}`,
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

