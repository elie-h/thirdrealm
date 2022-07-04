import {
  getNftsForOwner,
  initializeAlchemy,
  Network,
  Nft,
  NftExcludeFilters,
  type OwnedNft,
} from "@alch/alchemy-sdk";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {
  type Collection,
  type CollectionOwner,
  Network as DBNetwork,
} from "@prisma/client";
import { ethers } from "ethers";
import invariant from "tiny-invariant";
import { tokenOwnershipCache, walletCache, nftWalletCache } from "~/data/cache";
import { prisma } from "~/db.server";
import { deleteCollectionSpaceMemberships } from "~/models/collection.server";
import {
  deleteCollectionOwnership,
  getCollectionOwnership,
  upsertCollectionOwnership,
} from "~/models/collectionOwner.server";
import { truncateString } from "~/utils/strings";

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

export async function checkCollectionOwnership(
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

async function getWalletNfts(
  walletAddress: string,
  network: DBNetwork
): Promise<Nft[] | undefined> {
  if (nftWalletCache.has(`${network}-${walletAddress}`)) {
    return nftWalletCache.get(`${network}-${walletAddress}`);
  }
  let alchemy;
  if (network == DBNetwork.ethereum) {
    alchemy = initializeAlchemy({
      apiKey: process.env.ALCHEMY_ETH_API_KEY,
      network: Network.ETH_MAINNET,
      maxRetries: 3,
    });
  } else if (network == DBNetwork.polygon) {
    alchemy = initializeAlchemy({
      apiKey: process.env.ALCHEMY_MATIC_API_KEY,
      network: Network.MATIC_MAINNET,
      maxRetries: 3,
    });
  } else {
    throw new Error("Unknown network");
  }

  const nfts = await getNftsForOwner(alchemy, walletAddress, {
    excludeFilters: [NftExcludeFilters.SPAM],
    omitMetadata: true,
  });
  nftWalletCache.set(`${network}-${walletAddress}`, nfts.ownedNfts);
  // TODO: Add pagination
  return nfts.ownedNfts;
}

export async function getWalletSpaces(walletAddress: string) {
  /** Get the spaces a user is part of and is able to join */

  const ethNfts = (await getWalletNfts(walletAddress, "ethereum")) || [];
  const ethTokenContracts = ethNfts.map((nft) =>
    nft.contract.address.toLowerCase()
  );

  const polygonNfts = (await getWalletNfts(walletAddress, "polygon")) || [];
  const polygonTokenContracts = polygonNfts.map((nft) =>
    nft.contract.address.toLowerCase()
  );

  // TODO: The below assumes that the contract address isn't duplicated across networks. This is probably wrong.
  const eligibleSpaces = await prisma.space.findMany({
    include: {
      collection: true,
    },
    where: {
      collection: {
        contractAddress: {
          in: [...ethTokenContracts, ...polygonTokenContracts],
        },
      },
      members: {
        none: {
          walletAddress,
        },
      },
    },
  });

  const joinedSpaces = await prisma.space.findMany({
    where: {
      members: {
        some: {
          walletAddress,
        },
      },
    },
    include: {
      collection: true,
    },
  });
  return {
    eligible: eligibleSpaces,
    joined: joinedSpaces,
  };
}
