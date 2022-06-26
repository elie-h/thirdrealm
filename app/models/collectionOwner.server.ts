import type { Collection, CollectionOwner } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Collection } from "@prisma/client";

export async function upsertCollection(
  name: Collection["name"],
  description: Collection["description"],
  coverImage: Collection["coverImage"],
  symbol: Collection["symbol"],
  contractAddress: Collection["contractAddress"],
  network: Collection["network"],
  totalSupply: Collection["totalSupply"],
  tokenType: Collection["tokenType"]
) {
  const data = {
    name,
    description,
    coverImage,
    symbol,
    contractAddress,
    network,
    totalSupply,
    tokenType,
  };
  return prisma.collection.upsert({
    where: {
      contractAddress_network: {
        contractAddress,
        network,
      },
    },
    update: data,
    create: data,
  });
}
