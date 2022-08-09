/*
  Warnings:

  - Made the column `coverImage` on table `Space` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Space` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Space` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Space" ALTER COLUMN "coverImage" SET NOT NULL,
ALTER COLUMN "coverImage" SET DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT '';
