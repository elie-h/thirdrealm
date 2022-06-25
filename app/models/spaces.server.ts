import type { Space, Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Space } from "@prisma/client";

export async function getSpaces() {
  return await prisma.space.findMany({
    include: {
      collection: true,
    },
  });
}

export async function getSpaceById(id: Space["id"]) {
  return await prisma.space.findUnique({
    where: { id },
    include: {
      collection: true,
      _count: {
        select: { members: true },
      },
    },
  });
}

export async function getSpaceAndMembersById(
  id: Space["id"],
  walletId: Wallet["id"]
) {
  return await prisma.space.findUnique({
    where: { id },
    select: {
      collection: true,
      members: {
        where: {
          walletId: walletId,
        },
      },
    },
  });
}

export async function createSpaceMembership(
  spaceId: Space["id"],
  walletId: Wallet["id"]
) {
  return await prisma.walletSpaceMembership.create({
    data: {
      walletId: walletId,
      spaceId: spaceId,
    },
  });
}

export async function checkSpaceMembership(
  spaceId: Space["id"],
  walletId: Wallet["id"]
) {
  const count = await prisma.walletSpaceMembership.count({
    where: {
      walletId: walletId,
      spaceId: spaceId,
    },
  });
  return count > 0;
}
