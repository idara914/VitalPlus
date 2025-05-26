import pool from "@/config/db";

export async function GET(req) {
  const client = await pool.connect();
  try {
    const { searchParams } = new URL(req.url);
    const PatientId = searchParams.get("PatientId");

    if (!PatientId) {
      return new Response(JSON.stringify({ message: "Missing PatientId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await client.query(
      `SELECT "Id", "Goal"
       FROM public."Clinical_PatientCarePlan"
       WHERE "PatientId" = $1 AND "IsDeleted" = false AND "IsActive" = true
       ORDER BY "CreatedDT" DESC`,
      [PatientId]
    );

    const options = result.rows.map((row) => ({
      label: row.Goal,
      value: row.Id,
    }));

    return new Response(JSON.stringify(options), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🔴 Care Plan API Error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    client.release();
  }
}
