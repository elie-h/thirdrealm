-- CreateTable
CREATE TABLE "_SpaceToWallet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpaceToWallet_AB_unique" ON "_SpaceToWallet"("A", "B");

-- CreateIndex
CREATE INDEX "_SpaceToWallet_B_index" ON "_SpaceToWallet"("B");

-- AddForeignKey
ALTER TABLE "_SpaceToWallet" ADD CONSTRAINT "_SpaceToWallet_A_fkey" FOREIGN KEY ("A") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToWallet" ADD CONSTRAINT "_SpaceToWallet_B_fkey" FOREIGN KEY ("B") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
