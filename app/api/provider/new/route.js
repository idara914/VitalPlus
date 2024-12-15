// write a route to create a new provider

import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function post(req) {
  const provider = await db.collection("providers").insertOne(req.body);

  return NextResponse.json(provider);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
