// write a route to get all providers

import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function get(req) {
  const providers = await db.collection("providers").find().toArray();

  return NextResponse.json(providers);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
