/*
  Warnings:

  - You are about to drop the column `coverImage` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `contractAddress` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `network` on the `Community` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MembershipSetting" AS ENUM ('public', 'tokenGated', 'inviteOnly');

-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_contractAddress_network_fkey";

-- DropIndex
DROP INDEX "Community_contractAddress_network_key";

-- DropIndex
DROP INDEX "Community_name_key";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "coverImage",
DROP COLUMN "description",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "contractAddress",
DROP COLUMN "network",
ADD COLUMN     "membershipSetting" "MembershipSetting" NOT NULL DEFAULT 'public';

-- CreateTable
CREATE TABLE "CommunityCollectionRules" (
    "communityId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "network" "Network" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityCollectionRules_pkey" PRIMARY KEY ("communityId","contractAddress","network")
);

-- AddForeignKey
ALTER TABLE "CommunityCollectionRules" ADD CONSTRAINT "CommunityCollectionRules_contractAddress_network_fkey" FOREIGN KEY ("contractAddress", "network") REFERENCES "Collection"("contractAddress", "network") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityCollectionRules" ADD CONSTRAINT "CommunityCollectionRules_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
