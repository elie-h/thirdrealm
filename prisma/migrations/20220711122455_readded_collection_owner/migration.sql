-- CreateTable
CREATE TABLE "CollectionOwner" (
    "ownerAddress" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contractAddress" TEXT NOT NULL,
    "network" "Network" NOT NULL,

    CONSTRAINT "CollectionOwner_pkey" PRIMARY KEY ("contractAddress","ownerAddress","network")
);

-- AddForeignKey
ALTER TABLE "CollectionOwner" ADD CONSTRAINT "CollectionOwner_contractAddress_network_fkey" FOREIGN KEY ("contractAddress", "network") REFERENCES "Collection"("contractAddress", "network") ON DELETE RESTRICT ON UPDATE CASCADE;
