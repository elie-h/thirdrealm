import type { Collection, CollectionOwner } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Collection } from "@prisma/client";

export async function getCollectionOwnership(
  address: Collection["contractAddress"],
  network: Collection["network"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  const collectionOwner = await prisma.collectionOwner.findFirst({
    where: {
      ownerAddress: ownerAddress.toLowerCase(),
      contractAddress: address.toLowerCase(),
      network: network,
    },
  });
  return collectionOwner;
}

export async function upsertCollectionOwnership(
  address: Collection["contractAddress"],
  network: Collection["network"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  const data = {
    contractAddress: address.toLowerCase(),
    network: network,
    ownerAddress,
    updatedAt: new Date(),
  };
  return await prisma.collectionOwner.upsert({
    where: {
      contractAddress_ownerAddress_network: {
        ownerAddress: ownerAddress.toLowerCase(),
        contractAddress: address.toLowerCase(),
        network: network,
      },
    },
    update: data,
    create: data,
  });
}

export async function deleteCollectionOwnership(
  address: Collection["contractAddress"],
  network: Collection["network"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  try {
    return await prisma.collectionOwner.delete({
      where: {
        contractAddress_ownerAddress_network: {
          ownerAddress: ownerAddress.toLowerCase(),
          contractAddress: address.toLowerCase(),
          network: network,
        },
      },
    });
  } catch (error) {
    return false;
  }
}
