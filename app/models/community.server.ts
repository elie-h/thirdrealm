import type { Community, Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getCommunities() {
  return await prisma.community.findMany({});
}

export async function getCommunityById(id: Community["id"]) {
  return await prisma.community.findUnique({
    where: { id },
    include: {
      _count: {
        select: { members: true },
      },
    },
  });
}

export async function getCommunityAndMembersById(
  id: Community["id"],
  walletAddress: Wallet["address"]
) {
  return await prisma.community.findUnique({
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

export async function upsertCommunityMembership(
  communityId: Community["id"],
  walletAddress: Wallet["address"]
) {
  const data = {
    walletAddress,
    communityId,
  };
  return await prisma.walletCommunityMembership.upsert({
    where: {
      walletAddress_communityId: data,
    },
    create: data,
    update: data,
  });
}

export async function checkCommunityMembership(
  communityId: Community["id"],
  walletAddress: Wallet["address"]
) {
  const count = await prisma.walletCommunityMembership.count({
    where: {
      walletAddress,
      communityId,
    },
  });
  return count > 0;
}
