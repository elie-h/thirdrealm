import type { Space, Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Space } from "@prisma/client";

export async function getSpaces() {
  return prisma.space.findMany();
}

export async function getSpaceById(id: Space["id"]) {
  return prisma.space.findUnique({
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
  walletId: Wallet["id"]
) {
  return prisma.space.findUnique({
    where: { id },
    select: {
      contractAddress: true,
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
  return prisma.walletSpaceMemberships.create({
    data: {
      walletId: walletId,
      spaceId: spaceId,
    },
  });
}
