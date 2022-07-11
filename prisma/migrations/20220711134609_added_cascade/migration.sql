-- DropForeignKey
ALTER TABLE "CollectionOwner" DROP CONSTRAINT "CollectionOwner_contractAddress_network_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorAddress_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorAddress_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_contractAddress_network_fkey";

-- AddForeignKey
ALTER TABLE "CollectionOwner" ADD CONSTRAINT "CollectionOwner_contractAddress_network_fkey" FOREIGN KEY ("contractAddress", "network") REFERENCES "Collection"("contractAddress", "network") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_contractAddress_network_fkey" FOREIGN KEY ("contractAddress", "network") REFERENCES "Collection"("contractAddress", "network") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorAddress_fkey" FOREIGN KEY ("authorAddress") REFERENCES "Wallet"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorAddress_fkey" FOREIGN KEY ("authorAddress") REFERENCES "Wallet"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
