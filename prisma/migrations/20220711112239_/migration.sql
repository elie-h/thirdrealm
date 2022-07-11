/*
  Warnings:

  - You are about to drop the `CollectionOwner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CollectionOwner" DROP CONSTRAINT "CollectionOwner_collectionId_fkey";

-- DropTable
DROP TABLE "CollectionOwner";
