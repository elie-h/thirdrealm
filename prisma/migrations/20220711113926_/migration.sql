/*
  Warnings:

  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `Space` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contractAddress,network]` on the table `Space` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contractAddress` to the `Space` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_collectionId_fkey";

-- DropIndex
DROP INDEX "Collection_contractAddress_network_key";

-- DropIndex
DROP INDEX "Space_collectionId_key";

-- AlterTable
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("contractAddress", "network");

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "collectionId",
ADD COLUMN     "contractAddress" TEXT NOT NULL,
ADD COLUMN     "network" "Network" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Space_contractAddress_network_key" ON "Space"("contractAddress", "network");

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_contractAddress_network_fkey" FOREIGN KEY ("contractAddress", "network") REFERENCES "Collection"("contractAddress", "network") ON DELETE RESTRICT ON UPDATE CASCADE;
