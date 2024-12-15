// write a route to update a provider

import { NextResponse } from "next/server";
import db from "../../../lib/db";

const updateProvider = async (id, data) => {
  const updatedProvider = await db
    .collection("providers")
    .updateOne({ _id: id }, { $set: data });

  return updatedProvider;
};

export async function put(req) {
  const provider = await updateProvider(req.params.id, req.body);

  return NextResponse.json(provider);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
