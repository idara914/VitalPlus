import pool from "@/config/db";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    const { rows } = await pool.query(
      `SELECT "FirstName" FROM public."appUsers" WHERE "Id" = $1`,
      [userId]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ firstName: rows[0].FirstName }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
