import pool from "@/config/db";

export async function GET(req) {
  const client = await pool.connect();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  try {
    const result = await client.query(
      `
      SELECT "Id", "FirstName", "LastName"
      FROM public."ServiceProvider"
      WHERE "IsActive" = true AND "IsDeleted" IS NOT TRUE
        AND ($1 = '' OR "FirstName" ILIKE $1 OR "LastName" ILIKE $1)
      LIMIT 20
      `,
      [`%${search}%`]
    );

    const providers = result.rows.map((p) => ({
      label: `${p.FirstName} ${p.LastName}`,
      value: p.Id,
    }));

    return new Response(JSON.stringify(providers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("🔴 Error fetching ServiceProvider:", err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch providers" }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

