/*
  Warnings:

  - You are about to drop the column `spaceId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WalletSpaceMembership` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `communityId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_contractAddress_network_fkey";

-- DropForeignKey
ALTER TABLE "WalletSpaceMembership" DROP CONSTRAINT "WalletSpaceMembership_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "WalletSpaceMembership" DROP CONSTRAINT "WalletSpaceMembership_walletAddress_fkey";

-- DropIndex
DROP INDEX "Post_spaceId_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "spaceId",
ADD COLUMN     "communityId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Space";

-- DropTable
DROP TABLE "WalletSpaceMembership";

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "network" "Network" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletCommunityMembership" (
    "walletAddress" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletCommunityMembership_pkey" PRIMARY KEY ("walletAddress","communityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Community_contractAddress_network_key" ON "Community"("contractAddress", "network");

-- CreateIndex
CREATE INDEX "Post_communityId_idx" ON "Post"("communityId");

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_contractAddress_network_fkey" FOREIGN KEY ("contractAddress", "network") REFERENCES "Collection"("contractAddress", "network") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletCommunityMembership" ADD CONSTRAINT "WalletCommunityMembership_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "Wallet"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletCommunityMembership" ADD CONSTRAINT "WalletCommunityMembership_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
