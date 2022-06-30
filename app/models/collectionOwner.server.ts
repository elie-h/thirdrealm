import type { Collection, CollectionOwner } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Collection } from "@prisma/client";

export async function getCollectionOwnership(
  collectionId: Collection["id"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  const collectionOwner = await prisma.collectionOwner.findFirst({
    where: {
      ownerAddress: ownerAddress.toLowerCase(),
      collectionId,
    },
  });
  return collectionOwner;
}

export async function upsertCollectionOwnership(
  collectionId: Collection["id"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  const data = {
    collectionId,
    ownerAddress,
    updatedAt: new Date(),
  };
  return await prisma.collectionOwner.upsert({
    where: {
      collectionId_ownerAddress: {
        collectionId,
        ownerAddress: ownerAddress.toLowerCase(),
      },
    },
    update: data,
    create: data,
  });
}

export async function deleteCollectionOwnership(
  collectionId: Collection["id"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  try {
    return await prisma.collectionOwner.delete({
      where: {
        collectionId_ownerAddress: {
          collectionId,
          ownerAddress,
        },
      },
    });
  } catch (error) {
    return false;
  }
}
