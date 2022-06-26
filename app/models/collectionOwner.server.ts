import type { Collection, CollectionOwner } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Collection } from "@prisma/client";

export async function getCollectionOwnership(
  collectionId: Collection["id"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  const count = await prisma.collectionOwner.count({
    where: {
      ownerAddress: ownerAddress.toLowerCase(),
      collectionId,
    },
  });
  return count;
}

export async function upsertCollectionOwnership(
  collectionId: Collection["id"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  const data = {
    collectionId,
    ownerAddress,
  };
  return await prisma.collectionOwner.upsert({
    where: {
      collectionId_ownerAddress: data,
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
