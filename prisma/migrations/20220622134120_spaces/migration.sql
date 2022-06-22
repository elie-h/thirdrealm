/*
  Warnings:

  - Added the required column `blockchain` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Blockchain" AS ENUM ('ETHEREUM', 'POLYGON');

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "blockchain" "Blockchain" NOT NULL;
