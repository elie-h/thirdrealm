import type { Space, Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Space } from "@prisma/client";

export async function getSpaces() {
  return await prisma.space.findMany({});
}

export async function getSpaceById(id: Space["id"]) {
  return await prisma.space.findUnique({
    where: { id },
    include: {
      _count: {
        select: { members: true },
      },
    },
  });
}

export async function getSpaceAndMembersById(
  id: Space["id"],
  walletAddress: Wallet["address"]
) {
  return await prisma.space.findUnique({
    where: { id },
    select: {
      collection: true,
      members: {
        where: {
          walletAddress,
        },
      },
    },
  });
}

export async function upsertSpaceMembership(
  spaceId: Space["id"],
  walletAddress: Wallet["address"]
) {
  const data = {
    walletAddress,
    spaceId,
  };
  return await prisma.walletSpaceMembership.upsert({
    where: {
      walletAddress_spaceId: data,
    },
    create: data,
    update: data,
  });
}

export async function checkSpaceMembership(
  spaceId: Space["id"],
  walletAddress: Wallet["address"]
) {
  const count = await prisma.walletSpaceMembership.count({
    where: {
      walletAddress,
      spaceId,
    },
  });
  return count > 0;
}
