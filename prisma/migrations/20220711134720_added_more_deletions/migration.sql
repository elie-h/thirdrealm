-- DropForeignKey
ALTER TABLE "WalletSpaceMembership" DROP CONSTRAINT "WalletSpaceMembership_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "WalletSpaceMembership" DROP CONSTRAINT "WalletSpaceMembership_walletAddress_fkey";

-- AddForeignKey
ALTER TABLE "WalletSpaceMembership" ADD CONSTRAINT "WalletSpaceMembership_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "Wallet"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletSpaceMembership" ADD CONSTRAINT "WalletSpaceMembership_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
