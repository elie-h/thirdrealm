import type { Collection, Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Collection } from "@prisma/client";

export async function upsertCollection(
  name: Collection["name"],
  description: Collection["description"],
  coverImage: Collection["coverImage"],
  contractAddress: Collection["contractAddress"],
  network: Collection["network"]
) {
  const data = {
    name,
    description,
    coverImage,
    contractAddress,
    network,
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

export async function getCollections() {
  return prisma.collection.findMany();
}

export async function deleteCollectionSpaceMemberships(
  collectionAddress: Collection["contractAddress"],
  network: Collection["network"],
  walletAddress: Wallet["address"]
) {
  return await prisma.walletSpaceMembership.deleteMany({
    where: {
      walletAddress: walletAddress,
      space: {
        collection: {
          contractAddress: collectionAddress,
          network,
        },
      },
    },
  });
}
