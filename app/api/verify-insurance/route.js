import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const {
      payorName,
      cob,
      firstName,
      lastName,
      dob,
      gender,
      state,
      relationship,
      patientId,
    } = await req.json();

    const patient = await prisma.clinicPatient.findUnique({ where: { Id: patientId } });
    const agency = await prisma.agency.findFirst();
    const provider = await prisma.serviceProvider.findFirst({
      where: { AgencyId: agency.Id },
    });

    const payload = new URLSearchParams({
      payerId: payorName,
      memberId: cob,
      patientFirstName: firstName,
      patientLastName: lastName,
      patientBirthDate: dob,
      patientGender: gender,
      patientState: state,
      subscriberRelationship: relationship,
      patientSSN: patientId,
      providerFirstName: provider.FirstName,
      providerLastName: provider.LastName,
      providerNpi: agency.Npi,
      providerTaxId: agency.TaxNumber,
      providerCity: agency.City,
      providerState: agency.State,
      providerZipCode: agency.ZipCode,
    });

    const { data } = await axios.post(
      "https://api.availity.com/availity/development-partner/v1/coverages",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.AVAILITY_TOKEN}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

