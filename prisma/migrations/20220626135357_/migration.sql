/*
  Warnings:

  - The primary key for the `CollectionOwner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CollectionOwner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "lastRefreshed" SET DEFAULT '1993-10-19 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "CollectionOwner" DROP CONSTRAINT "CollectionOwner_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CollectionOwner_pkey" PRIMARY KEY ("collectionId", "ownerAddress");
