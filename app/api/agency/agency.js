import express from 'express';
import dotenv from 'dotenv';
import pool from './../config/db.js';

dotenv.config();

const router = express.Router();

// Example route to validate token
router.get('/agency-types', async (req, res) => {

    try {
        const { rows } = await pool.query(`SELECT * FROM public."AgencyType"`);

        if (rows.length > 0) {
            return res.status(200).json({ success: true, data: rows });
        } else {
            return res.status(200).json({ success: true, message: "No record Found" });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: "Something went wrong!", error: e });
    }

});

export default router;
