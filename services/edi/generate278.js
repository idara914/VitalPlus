// File: /api/generate278.js

const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

// Setup PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Or use user/password/host/db config
});

// Utility to build EDI segments
function buildSegment(tag, elements) {
  return tag + "*" + elements.join("*") + "~";
}

async function generate278File(req, res) {
  try {
    // Query the 278_Staging table
    const result = await pool.query("SELECT * FROM \"278_Staging\" WHERE Status = 'Pending'");
    const records = result.rows;

    if (records.length === 0) {
      return res.status(404).send("No pending records found.");
    }

    let ediContent = "";

    // Begin ISA/GS/ST (Static control segments - adjust as needed)
    ediContent += buildSegment("ISA", [
      "00", "          ",
      "00", "          ",
      "ZZ", "SENDERID     ",
      "ZZ", "RECEIVERID   ",
      "240528", "1200", "^", "00501", "000000001", "0", "P", ">"
    ]);

    ediContent += buildSegment("GS", [
      "HI", "SENDERID", "RECEIVERID", "20240528", "1200", "1", "X", "005010X217"
    ]);

    ediContent += buildSegment("ST", ["278", "0001", "005010X217"]);

    for (const record of records) {
      ediContent += buildSegment("BHT", [
        "0010", record.EventTypeCode || "13", record.AuthorizationID,
        new Date().toISOString().split("T")[0].replace(/-/g, ""), "1200", "RP"
      ]);

      ediContent += buildSegment("HL", ["1", "", "20", "1"]); // Info Source
      ediContent += buildSegment("NM1", ["X3", "2", "VITALPLUS"]);

      ediContent += buildSegment("HL", ["2", "1", "21", "1"]); // Subscriber
      ediContent += buildSegment("NM1", ["IL", "1", record.PatientLastName, record.PatientFirstName, "", "", "", "", record.SubscriberID]);
      ediContent += buildSegment("DMG", ["D8", record.DOB.replace(/-/g, ""), record.Gender]);

      ediContent += buildSegment("HL", ["3", "2", "22", "0"]); // Patient Level

      ediContent += buildSegment("TRN", ["1", record.AuthorizationID]);

      ediContent += buildSegment("UM", [
        "HS", record.ServiceTypeCode,
        "", record.ProcedureCodes, "", record.UnitsRequested,
        "", record.Frequency, "Y"
      ]);

      ediContent += buildSegment("HI", ["BK:" + record.DiagnosisCode]);

      ediContent += buildSegment("HSD", ["QT", record.UnitsRequested, "DA"]);

      ediContent += buildSegment("DTP", ["472", "D8", record.StartDate.replace(/-/g, "")]);
      ediContent += buildSegment("DTP", ["473", "D8", record.EndDate.replace(/-/g, "")]);

      ediContent += buildSegment("NM1", ["77", "2", record.ServiceFacilityName]);
      ediContent += buildSegment("N3", [record.ServiceAddressLine1, record.ServiceAddressLine2 || ""]);
      ediContent += buildSegment("N4", [record.ServiceCity, record.ServiceState, record.ServiceZip]);

      if (record.Notes) {
        ediContent += buildSegment("NTE", ["ADD", record.Notes]);
      }
    }

    ediContent += buildSegment("SE", ["20", "0001"]);
    ediContent += buildSegment("GE", ["1", "1"]);
    ediContent += buildSegment("IEA", ["1", "000000001"]);

    // Save to file
   const outputDir = "/vital-edi/278/pending";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const filePath = path.join(outputDir, `278_${Date.now()}.txt`);


    res.status(200).send(`278 file generated: ${filePath}`);
  } catch (error) {
    console.error("🔴 Error generating 278 file:", error);
    res.status(500).send("Failed to generate 278 file.");
  }
}

module.exports = generate278File;
