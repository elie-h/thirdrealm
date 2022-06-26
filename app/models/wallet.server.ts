import type { Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Wallet } from "@prisma/client";

export async function getWalletById(address: Wallet["address"]) {
  return prisma.wallet.findUnique({
    where: { address: address.toLowerCase() },
  });
}

export async function getWalletByAddress(address: Wallet["address"]) {
  return prisma.wallet.findUnique({
    where: { address: address.toLowerCase() },
  });
}

export async function createWallet(address: Wallet["address"]) {
  return prisma.wallet.create({
    data: { address: address.toLowerCase() },
  });
}

export async function updateLastSeen(address: Wallet["address"]) {
  return prisma.wallet.update({
    where: {
      address: address.toLowerCase(),
    },
    data: { lastSeen: new Date() },
  });
}
