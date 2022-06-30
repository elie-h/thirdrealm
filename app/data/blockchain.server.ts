import { getNftsForOwner, initializeAlchemy, Network } from "@alch/alchemy-sdk";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import type {
  Collection,
  CollectionOwner,
  Network as DBNetwork,
} from "@prisma/client";
import { tokenOwnershipCache, walletCache } from "~/data/cache";
import { deleteCollectionSpaceMemberships } from "~/models/collection.server";
import {
  deleteCollectionOwnership,
  getCollectionOwnership,
  upsertCollectionOwnership,
} from "~/models/collectionOwner.server";

import { ethers } from "ethers";
import { truncateString } from "~/utils/strings";
import invariant from "tiny-invariant";

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

export async function getWalletData(walletAddress: string) {
  const cached_value = walletCache.get(walletAddress);
  if (cached_value != undefined) {
    return cached_value;
  }
  invariant(process.env.ALCHEMY_ETH_RPC, "ALCHEMY_ETH_RPC is not set");
  const web3 = createAlchemyWeb3(process.env.ALCHEMY_ETH_RPC);
  const provider = new ethers.providers.AlchemyProvider(
    "homestead",
    process.env.ALCHEMY_ETH_API_KEY
  );
  const ens = await provider.lookupAddress(walletAddress);

  const eth_owned_nfts = await web3.alchemy.getNfts({
    owner: walletAddress,
  });
  const nfts_to_return: any[] = [];
  eth_owned_nfts.ownedNfts.forEach((nft) => {
    let nft_cover: string;
    // @ts-ignore
    if (nft.media && nft.media?.length > 0 && nft.media[0].gateway != "") {
      // @ts-ignore
      nft_cover = nft.media[0].gateway;
    } else if (nft.metadata?.image) {
      nft_cover = nft.metadata.image;
    } else if (nft.metadata?.image_url) {
      nft_cover = nft.metadata?.image_url;
    } else {
      nft_cover = "";
    }

    if (nft.title == "" && nft.description == "") {
      return;
    }

    nfts_to_return.push({
      title: nft.title,
      description: truncateString(nft.metadata?.description, 64),
      coverImg: nft_cover.startsWith("ipfs")
        ? `https://ipfs.io/${nft_cover.replace("ipfs://", "ipfs/")}`
        : nft_cover,
      contract: nft.contract.address,
    });
  });
  const walletObject = {
    nfts: nfts_to_return,
    nftCount: nfts_to_return.length,
    ens,
  };
  walletCache.set(walletAddress, walletObject);
  return walletObject;
}
