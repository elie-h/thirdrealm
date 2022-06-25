import invariant from "tiny-invariant";
import {
  Collection,
  getCollections,
  updateCollectionLastRefreshed,
  updateCollectionOwners,
} from "~/models/collection.server";
// @ts-ignore
import fetch from "node-fetch";
// @ts-ignore
import schedule from "node-schedule";

require("dotenv").config();

async function getOwnersForCollection(contractAddress: string) {
  const apiKey = process.env.ALCHEMY_ETH_API_KEY;
  invariant(apiKey, "ALCHEMY_ETH_API_KEY is not set");
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForCollection`;
  const fetchURL = `${baseURL}?contractAddress=${contractAddress}`;

  const res = await fetch(fetchURL, {
    method: "GET",
    redirect: "follow",
  });
  const owners = await res.json();
  return owners.ownerAddresses;
}

async function hydrateCollection(collection: Collection) {
  if (
    collection.lastRefreshed == undefined ||
    collection.lastRefreshed < new Date(Date.now() - 30 * 60 * 60)
  ) {
    const currentOwners = await getOwnersForCollection(
      collection.contractAddress
    );
    await updateCollectionOwners(collection.id, currentOwners);
    await updateCollectionLastRefreshed(collection.id);
    return;
  } else {
    console.log(
      `Skipping ${collection.contractAddress} as refresh date is recent`
    );
  }
}

async function main() {
  console.log("Starting Hydration");
  const collections = await getCollections();
  for (const collection of collections) {
    hydrateCollection(collection);
  }
}

main();
schedule.scheduleJob("*/5 * * * *", async function () {
  await main();
});

// Add network support for polygon
