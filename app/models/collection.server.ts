import { prisma } from "~/db.server";

export type { Collection } from "@prisma/client";

export async function getCollections() {
  return await prisma.collection.findMany();
}
