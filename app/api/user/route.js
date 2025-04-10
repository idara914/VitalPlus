import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "@/config/db";

dotenv.config();

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_ORIGIN || "https://www.vital-plus.xyz",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
  try {
    const { action, ...body } = await req.json();
    if (action === "updateProfile") return await updateProfile(body);

    return new Response(JSON.stringify({ message: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

async function updateProfile(body) {
  const {
    orgName,
    contactNumber,
    faxNumber,
    taxNumber,
    address,
    city,
    state,
    zipCode,
    agencyType,
    email,
    userId,
  } = body;

  if (!email || !userId || !orgName) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const now = new Date();
  const formattedNow = now.toISOString();

  // 🔡 Generate ID prefix
  const shortId = orgName.slice(0, 4).toLowerCase();

  // 🔢 Count how many already exist with that prefix
  const { rows: existing } = await pool.query(
    `SELECT COUNT(*) FROM public."Agency" WHERE "Id" LIKE $1`,
    [`${shortId}%`]
  );

  const agencyCount = parseInt(existing[0]?.count || 0, 10);
  const agencyId = `${shortId}${String(agencyCount + 1).padStart(2, "0")}`;

  // 🏢 Insert new agency
  const { rows: inserted } = await pool.query(
    `INSERT INTO public."Agency" (
      "Id", "Name", "FullAddress", "ContactNumber1", "FaxNumber", "TaxNumber",
      "City", "State", "ZipCode", "Email", "IsActive", "IsDeleted",
      "CreatedBy", "CreatedDT", "ModifiedBy", "ModifiedDT", "CountryId", "AgencyType"
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
    RETURNING "Id";`,
    [
      agencyId,
      orgName,
      address,
      contactNumber,
      faxNumber,
      taxNumber,
      city,
      state,
      zipCode,
      email,
      true,
      false,
      userId,
      formattedNow,
      userId,
      formattedNow,
      1, // CountryId
      agencyType,
    ]
  );

  // 👤 Link agency to user
  if (inserted.length > 0) {
    await pool.query(
      `UPDATE public."appUsers" SET "CompanyId" = $2, "ModifiedBy" = $3, "ModifiedDT" = $4 WHERE "Id" = $1;`,
      [userId, inserted[0].Id, userId, formattedNow]
    );

    return new Response(
      JSON.stringify({ message: "User profile updated successfully" }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Failed to update user profile" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}

