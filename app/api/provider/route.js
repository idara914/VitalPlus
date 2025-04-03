import pool from "@/config/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_ORIGIN || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      FirstName,
      LastName,
      MiddleInitial,
      AddressLine1,
      AddressLine2,
      City,
      State,
      ZipCode,
      PhoneNumber,
      Gender,
      Email,
      FaxNumber,
      NPI,
      DOB,
      Remarks,
      userId,
      AgencyId = 1,
      ClinicId = null,
    } = body;

    const CreatedDT = new Date().toISOString();
    const ModifiedDT = CreatedDT;

    const { rows: inserted } = await pool.query(
      `INSERT INTO public."ServiceProvider" 
      ("FirstName", "LastName", "MiddleInitial", "FullAddress", "City", "State", "ZipCode", "ContactNumber1", "FaxNumber", "Email", "Gender", "Code", "DOB", "Remarks", "CreatedBy", "CreatedDT", "ModifiedBy", "ModifiedDT", "IsActive", "IsDeleted", "AgencyId", "ClinicId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, true, false, $19, $20) 
      RETURNING "Id";`,
      [
        FirstName,
        LastName,
        MiddleInitial,
        `${AddressLine1} ${AddressLine2 || ""}`.trim(),
        City,
        State,
        ZipCode,
        PhoneNumber,
        FaxNumber,
        Email,
        Gender,
        NPI,
        DOB,
        Remarks,
        userId,
        CreatedDT,
        userId,
        ModifiedDT,
        AgencyId,
        ClinicId,
      ]
    );

    return new Response(
      JSON.stringify({ message: "Provider added successfully", id: inserted[0].Id }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
