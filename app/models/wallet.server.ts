import type { Prisma, Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Wallet } from "@prisma/client";

export async function getWallet(address: Wallet["address"]) {
  return await prisma.wallet.findUnique({
    where: { address: address.toLowerCase() },
    include: {
      memberships: {
        include: {
          community: true,
        },
      },
    },
  });
}

export type WalletWithMemberships = Prisma.PromiseReturnType<typeof getWallet>;

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
