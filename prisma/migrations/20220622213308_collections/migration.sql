/*
  Warnings:

  - You are about to drop the column `contractAddress` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `network` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the `WalletSpaceMemberships` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[collectionId]` on the table `Space` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collectionId` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WalletSpaceMemberships" DROP CONSTRAINT "WalletSpaceMemberships_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "WalletSpaceMemberships" DROP CONSTRAINT "WalletSpaceMemberships_walletId_fkey";

-- DropIndex
DROP INDEX "Space_contractAddress_key";

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "contractAddress",
DROP COLUMN "coverImage",
DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "network",
ADD COLUMN     "collectionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "WalletSpaceMemberships";

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "network" "Network" NOT NULL,
    "totalSupply" INTEGER NOT NULL,
    "tokenType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionOwner" (
    "id" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletSpaceMembership" (
    "walletId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletSpaceMembership_pkey" PRIMARY KEY ("walletId","spaceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_contractAddress_network_key" ON "Collection"("contractAddress", "network");

-- CreateIndex
CREATE UNIQUE INDEX "Space_collectionId_key" ON "Space"("collectionId");

-- AddForeignKey
ALTER TABLE "CollectionOwner" ADD CONSTRAINT "CollectionOwner_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletSpaceMembership" ADD CONSTRAINT "WalletSpaceMembership_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletSpaceMembership" ADD CONSTRAINT "WalletSpaceMembership_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
