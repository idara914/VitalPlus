import pool from "@/config/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

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
  const client = await pool.connect();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
      UserName,
      NormalizedEmail
    } = body;

    // Normalize gender
    let normalizedGender = Gender;
    if (typeof Gender === "string") {
      if (Gender.toLowerCase() === "male") normalizedGender = 1;
      else if (Gender.toLowerCase() === "female") normalizedGender = 2;
    }

    const { rows: userRows } = await client.query(
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

    await client.query("BEGIN");

    // 1. Insert ServiceProvider
    const { rows: serviceProviderRows } = await client.query(
      `INSERT INTO public."ServiceProvider" 
      ("FirstName", "LastName", "MiddleInitial", "AddressLine1", "City", "State", "ZipCode", 
       "ContactNumber1", "FarNumber", "Email", "Gender", "Code", "DOB", "Remarks", 
       "CreatedBy", "CreatedDT", "ModifiedBy", "ModifiedDT", "IsActive", "IsDeleted", "AgencyId", "ClinicId")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, true, false, $19, $20)
       RETURNING "Id"`,
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

    const serviceProviderId = serviceProviderRows[0].Id;

    // 2. Insert into HR_Employees
    const hrEmployeeId = uuidv4();
    await client.query(
      `INSERT INTO public."HR_Employees"
      ("EmployeeID", "FirstName", "LastName", "Email", "Gender", "Phone", 
       "IsActive", "IsDeleted", "CreatedBy", "CreatedDT", "ModifiedBy", "ModifiedDT", 
       "DateOfBirth", "PositionID", "AgencyId")
       VALUES ($1, $2, $3, $4, $5, $6, true, false, $7, $8, $7, $8, $9, $10, $11)`,
      [
        hrEmployeeId,
        FirstName,
        LastName,
        Email,
        normalizedGender,
        PhoneNumber,
        userId,
        CreatedDT,
        DOB,
        serviceProviderId,
        AgencyId
      ]
    );

    // 3. Insert into appUsers
    await client.query(
      `INSERT INTO public."appUsers"
      ("Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", 
       "FirstName", "LastName", "CreatedDT", "ModifiedDT", "EmployeeID", "CompanyId")
       VALUES ($1, $2, $3, $4, $5, false, $6, $7, $8, $8, $9, $10)`,
      [
        uuidv4(),
        UserName,
        UserName.toUpperCase(),
        Email,
        NormalizedEmail,
        FirstName,
        LastName,
        CreatedDT,
        hrEmployeeId,
        AgencyId
      ]
    );

    await client.query("COMMIT");

    return new Response(
      JSON.stringify({ message: "Provider added and linked successfully", id: serviceProviderId }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("🔴 Error:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } finally {
    client.release();
  }
}
