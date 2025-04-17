import pool from "@/config/db";

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "Missing provider ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { rows } = await pool.query(
      `SELECT "Id", "FirstName", "LastName", "DOB", "Email", "PhoneNumber", "ServiceProviderCode", "EffOt", "TermOt", "IsActive"
       FROM public."ServiceProvider" WHERE "Id" = $1`,
      [id]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "Provider not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching provider:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

