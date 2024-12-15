import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function get(req) {
  const id = req.params.id;
  const provider = await db.collection("providers").findOne({ _id: id });

  if (!provider) {
    return NextResponse.error(new Error("Provider not found"), 404);
  }

  return NextResponse.json(provider);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
