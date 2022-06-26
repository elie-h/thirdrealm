import { getNftsForOwner, initializeAlchemy, Network } from "@alch/alchemy-sdk";
import type {
  Collection,
  CollectionOwner,
  Network as DBNetwork,
} from "@prisma/client";
import { deleteCollectionSpaceMemberships } from "~/models/collection.server";
import {
  deleteCollectionOwnership,
  getCollectionOwnership,
  upsertCollectionOwnership,
} from "~/models/collectionOwner.server";

async function getOwnersForCollection(
  contractAddress: string,
  walletAddress: string,
  network: DBNetwork
) {
  let alchemy_network: Network;
  switch (network) {
    case "ethereum":
      alchemy_network = Network.ETH_MAINNET;
      break;
    case "polygon":
      alchemy_network = Network.MATIC_MAINNET;
      break;
  }

  const settings = {
    apiKey: process.env.ALCHEMY_ETH_API_KEY,
    network: alchemy_network,
    maxRetries: 3,
  };

  const alchemy = initializeAlchemy(settings);

  // Print total NFT count returned in the response:
  const nftsForOwner = await getNftsForOwner(alchemy, walletAddress, {
    contractAddresses: [contractAddress],
    omitMetadata: true,
  });
  return nftsForOwner.totalCount;
}

export async function checkTokenOwnership(
  collection: Collection,
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  // Check cache first
  const ownedTokensDB = await getCollectionOwnership(
    collection.id,
    ownerAddress
  );
  if (
    ownedTokensDB > 0 &&
    collection.updatedAt < new Date(Date.now() - 30 * 60 * 60)
  ) {
    return true;
  }
  // Check alchemy response
  const ownedTokens = await getOwnersForCollection(
    collection.contractAddress,
    ownerAddress,
    collection.network
  );

  // Update cache and return
  if (ownedTokens > 0) {
    console.log("Alchemy hit");
    await upsertCollectionOwnership(collection.id, ownerAddress);
    return true;
  } else {
    // Delete cache entry if any
    await deleteCollectionOwnership(collection.id, ownerAddress);
    // Revoke any memberships
    await deleteCollectionSpaceMemberships(collection.id, ownerAddress);
    return false;
  }
}
