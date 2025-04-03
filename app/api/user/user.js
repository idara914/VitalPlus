import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "@/config/db";

dotenv.config();

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_ORIGIN || "https://www.vital-plus.xyz",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const { id, email } = jwt.verify(token, process.env.JWT_SECRET);

    const { action, ...body } = await req.json();
    if (action === "updateProfile") return await updateProfile(id, email, body);

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

async function updateProfile(userId, userEmail, body) {
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
  } = body;

  const now = new Date();
  const formattedNow = now.toISOString();

  const agencyData = {
    Name: orgName,
    FullAddress: address,
    ContactNumber1: contactNumber,
    FaxNumber: faxNumber,
    TaxNumber: taxNumber,
    City: city,
    State: state,
    ZipCode: zipCode,
    Email: userEmail,
    IsActive: true,
    IsDeleted: false,
    CreatedBy: userId,
    CreatedDT: formattedNow,
    ModifiedBy: userId,
    ModifiedDT: formattedNow,
    CountryId: 1,
    AgencyType: agencyType,
  };

  const { rows: inserted } = await pool.query(
    `INSERT INTO public."Agency" (
      "Name", "FullAddress", "ContactNumber1", "FaxNumber", "TaxNumber",
      "City", "State", "ZipCode", "Email", "IsActive", "IsDeleted",
      "CreatedBy", "CreatedDT", "ModifiedBy", "ModifiedDT", "CountryId", "AgencyType"
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
    RETURNING "Id";`,
    [
      agencyData.Name,
      agencyData.FullAddress,
      agencyData.ContactNumber1,
      agencyData.FaxNumber,
      agencyData.TaxNumber,
      agencyData.City,
      agencyData.State,
      agencyData.ZipCode,
      agencyData.Email,
      agencyData.IsActive,
      agencyData.IsDeleted,
      agencyData.CreatedBy,
      agencyData.CreatedDT,
      agencyData.ModifiedBy,
      agencyData.ModifiedDT,
      agencyData.CountryId,
      agencyData.AgencyType,
    ]
  );

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
