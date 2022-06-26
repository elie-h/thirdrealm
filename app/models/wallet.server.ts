import type { Wallet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Wallet } from "@prisma/client";

export async function getWalletById(id: Wallet["id"]) {
  return prisma.wallet.findUnique({ where: { id } });
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

export async function updateLastSeen(id: Wallet["id"]) {
  return prisma.wallet.update({
    where: {
      id,
    },
    data: { lastSeen: new Date() },
  });
}
