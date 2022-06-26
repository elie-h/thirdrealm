/*
  Warnings:

  - The primary key for the `Wallet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Wallet` table. All the data in the column will be lost.
  - The primary key for the `WalletSpaceMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `walletId` on the `WalletSpaceMembership` table. All the data in the column will be lost.
  - Added the required column `walletAddress` to the `WalletSpaceMembership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WalletSpaceMembership" DROP CONSTRAINT "WalletSpaceMembership_walletId_fkey";

-- DropIndex
DROP INDEX "Wallet_address_key";

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "lastRefreshed" SET DEFAULT '1993-10-19 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Wallet_pkey" PRIMARY KEY ("address");

-- AlterTable
ALTER TABLE "WalletSpaceMembership" DROP CONSTRAINT "WalletSpaceMembership_pkey",
DROP COLUMN "walletId",
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD CONSTRAINT "WalletSpaceMembership_pkey" PRIMARY KEY ("walletAddress", "spaceId");

-- AddForeignKey
ALTER TABLE "WalletSpaceMembership" ADD CONSTRAINT "WalletSpaceMembership_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "Wallet"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
