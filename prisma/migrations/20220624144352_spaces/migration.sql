/*
  Warnings:

  - Made the column `lastRefreshed` on table `Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "lastRefreshed" SET NOT NULL,
ALTER COLUMN "lastRefreshed" SET DEFAULT '1993-10-19 00:00:00 +00:00';
