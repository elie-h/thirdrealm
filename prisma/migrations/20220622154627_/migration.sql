/*
  Warnings:

  - You are about to drop the column `blockchain` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the `_SpaceToWallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Network" AS ENUM ('ethereum', 'polygon');

-- DropForeignKey
ALTER TABLE "_SpaceToWallet" DROP CONSTRAINT "_SpaceToWallet_A_fkey";

-- DropForeignKey
ALTER TABLE "_SpaceToWallet" DROP CONSTRAINT "_SpaceToWallet_B_fkey";

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "blockchain",
ADD COLUMN     "network" "Network" NOT NULL DEFAULT E'ethereum';

-- DropTable
DROP TABLE "_SpaceToWallet";

-- DropEnum
DROP TYPE "Blockchain";

-- CreateTable
CREATE TABLE "WalletSpaceMemberships" (
    "walletId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletSpaceMemberships_pkey" PRIMARY KEY ("walletId","spaceId")
);

-- AddForeignKey
ALTER TABLE "WalletSpaceMemberships" ADD CONSTRAINT "WalletSpaceMemberships_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletSpaceMemberships" ADD CONSTRAINT "WalletSpaceMemberships_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
