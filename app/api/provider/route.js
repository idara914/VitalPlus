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
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = decoded.id;
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
    } = body;

    // ✅ Normalize Gender to 1 (Male) or 2 (Female)
    let normalizedGender = Gender;
    if (typeof Gender === "string") {
      if (Gender.toLowerCase() === "male") normalizedGender = 1;
      else if (Gender.toLowerCase() === "female") normalizedGender = 2;
    }

    // ✅ pull agency from user's CompanyId
    const { rows: userRows } = await pool.query(
      `SELECT "CompanyId" FROM public."appUsers" WHERE "Id" = $1`,
      [userId]
    );

    if (userRows.length === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const AgencyId = userRows[0].CompanyId;
    const ClinicId = null;

    const CreatedDT = new Date().toISOString();
    const ModifiedDT = CreatedDT;

    const { rows: inserted } = await pool.query(
      `INSERT INTO public."ServiceProvider" 
        ("FirstName", "LastName", "MiddleInitial", "AddressLine1", "City", "State", "ZipCode", "ContactNumber1", "FarNumber", "Email", "Gender", "Code", "DOB", "Remarks", "CreatedBy", "CreatedDT", "ModifiedBy", "ModifiedDT", "IsActive", "IsDeleted", "AgencyId", "ClinicId")
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
        normalizedGender,
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
