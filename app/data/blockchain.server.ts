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
import { tokenOwnershipCache } from "~/data/cache";

async function getOwnersForCollection(
  contractAddress: string,
  walletAddress: string,
  network: DBNetwork
) {
  const cached_value = tokenOwnershipCache.get(
    `${network}-${contractAddress}-${walletAddress}`
  );
  if (cached_value != undefined) {
    return cached_value;
  }

  let alchemy_network: Network;
  switch (network) {
    case "ethereum":
      alchemy_network = Network.ETH_MAINNET;
      break;
    case "polygon":
      alchemy_network = Network.MATIC_MAINNET;
      break;
  }

  const alchemy = initializeAlchemy({
    apiKey: process.env.ALCHEMY_ETH_API_KEY,
    network: alchemy_network,
    maxRetries: 3,
  });
  const nftsForOwner = await getNftsForOwner(alchemy, walletAddress, {
    contractAddresses: [contractAddress],
    omitMetadata: true,
  });

  tokenOwnershipCache.set(
    `${network}-${contractAddress}-${walletAddress}`,
    nftsForOwner.totalCount
  );

  return nftsForOwner.totalCount;
}

export async function checkTokenOwnership(
  collection: Collection,
  ownerAddress: CollectionOwner["ownerAddress"]
) {
  // Check db first
  const collectionOwner = await getCollectionOwnership(
    collection.id,
    ownerAddress
  );
  if (
    collectionOwner != undefined &&
    collectionOwner.updatedAt > new Date(Date.now() - 30 * 60 * 60)
  ) {
    console.log("Getting from cache");
    return true;
  }
  // Check alchemy response
  console.log("Getting through alchemy");
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
