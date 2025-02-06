import express from 'express';
import dotenv from 'dotenv';
import pool from './../config/db.js';
import { auth } from './../middlewares/authMiddleware.js';

dotenv.config();

const router = express.Router();

// Example route to validate token
router.post('/getUserByEmail', async (req, res) => {
  let { email } = req.body;

  if (!email) return res.status(403).send({ message: 'Server Error' });

  const { rows } = await pool.query('SELECT id, email, mfa_secret FROM users WHERE email = $1', [email]);

  if (rows.length > 0) {
    return res.status(200).json({ success: true, user: rows[0] });
  } else {
    return res.status(400).json({ success: false, message: "Server Error" });
  }
});

// Example route to validate token
router.get('/getUsers', async (req, res) => {

  try {
    const { rows } = await pool.query(`SELECT * FROM public."appUsers"`);

    if (rows.length > 0) {
      return res.status(200).json({ success: true, data: rows });
    } else {
      return res.status(200).json({ success: true, message: "No record Found" });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: "Something went wrong!", error: e });
  }

});

// Example route to validate token
router.post('/updateProfile', auth, async (req, res) => {
  const { orgName, contactNumber, faxNumber, taxNumber, address, city, state, zipCode, agencyType } = req.body;

  const options = {
    timeZone: 'America/New_York', // Change to desired US timezone
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);

  const agencyData = {
    Name: orgName,
    FullAddress: address,
    ContactNumber1: contactNumber,
    FaxNumber: faxNumber,
    TaxNumber: taxNumber,
    City: city,
    State: state,
    ZipCode: zipCode,
    Email: req.user.user.Email,
    IsActive: true,
    IsDeleted: false,
    CreatedBy: req.user.id,
    CreatedDT: formatter.format(new Date()),
    ModifiedBy: req.user.id,
    ModifiedDT: formatter.format(new Date()),
    CountryId: 1,
    AgencyType: agencyType
  } 

  // Insert the user into the database
  const { rows: InsertedUser } = await pool.query(
    'INSERT INTO public."Agency" ("Name", "FullAddress", "ContactNumber1", "FaxNumber", "TaxNumber", "City","State", "ZipCode", "Email", "IsActive", "IsDeleted", "CreatedBy", "CreatedDT", "ModifiedBy", "ModifiedDT", "CountryId", "AgencyType") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING "Id";',
    [agencyData.Name, agencyData.FullAddress, agencyData.ContactNumber1, agencyData.FaxNumber, agencyData.TaxNumber, agencyData.City, agencyData.State, agencyData.ZipCode, agencyData.Email, agencyData.IsActive, agencyData.IsDeleted, agencyData.CreatedBy, agencyData.CreatedDT, agencyData.ModifiedBy, agencyData.ModifiedDT, agencyData.CountryId, agencyData.AgencyType]
  );

  if (InsertedUser.length > 0) {
    await pool.query(
      `UPDATE public."appUsers" SET "CompanyId" = $2, "ModifiedBy" = $3, "ModifiedDT" = $4 WHERE "Id" = $1;`,
      [req.user.id, InsertedUser[0].Id, req.user.id, new Date().toISOString()]
    );
    res.status(201).json({ status: true, message: 'User profile updated successfully' });
  } else {
    res.status(500).json({ status: false, message: 'Something went wrong!' });
  }

});


export default router;
