import type { Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Wallet } from "@prisma/client";

export async function getWallet(
  address: Wallet["address"],
  includeMemberships: boolean = false
) {
  return await prisma.wallet.findUnique({
    where: { address: address.toLowerCase() },
    include: {
      memberships: {
        include: {
          community: {
            include: {
              collection: true,
            },
          },
        },
      },
    },
  });
}

export async function createWallet(address: Wallet["address"]) {
  return await prisma.wallet.create({
    data: { address: address.toLowerCase() },
  });
}

export async function updateLastSeen(address: Wallet["address"]) {
  return await prisma.wallet.update({
    where: {
      address: address.toLowerCase(),
    },
    data: { lastSeen: new Date() },
  });
}
