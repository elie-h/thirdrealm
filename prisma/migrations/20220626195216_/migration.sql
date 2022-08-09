/*
  Warnings:

  - You are about to drop the column `lastRefreshed` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `totalSupply` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "lastRefreshed",
DROP COLUMN "symbol",
DROP COLUMN "tokenType",
DROP COLUMN "totalSupply";
