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

export async function getCollections() {
  return prisma.collection.findMany();
}

export async function checkAddressInCollection(
  collectionId: Collection["id"],
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  const count = await prisma.collectionOwner.count({
    where: {
      ownerAddress: ownerAddress.toLowerCase(),
      collectionId,
    },
  });
  return count > 0;
}

export async function updateCollectionOwners(
  collectionId: CollectionOwner["id"],
  newOwners: CollectionOwner["ownerAddress"][]
) {
  const deleteManyOp = await prisma.collectionOwner.deleteMany({
    where: {
      collectionId,
      ownerAddress: {
        notIn: newOwners,
      },
    },
  });
  console.debug(`Deleted ${deleteManyOp.count} owners from ${collectionId}`);

  const currentOwners = await prisma.collectionOwner.findMany({
    select: {
      ownerAddress: true,
    },
    where: {
      collectionId,
    },
  });

  const currentOwnersList = currentOwners.map((owner) => owner.ownerAddress);
  const ownersToInsert = newOwners
    .filter((owner) => !currentOwnersList.includes(owner))
    .map((ownerAddress) => ({
      ownerAddress: ownerAddress,
      collectionId,
    }));

  const createManyOp = await prisma.collectionOwner.createMany({
    data: ownersToInsert,
    skipDuplicates: true, // Skip 'Bobo'
  });
  console.log(`Inserted ${createManyOp.count} new owners to ${collectionId}`);
}

export async function updateCollectionLastRefreshed(id: Collection["id"]) {
  await prisma.collection.update({
    where: { id },
    data: {
      lastRefreshed: new Date(),
    },
  });
}
