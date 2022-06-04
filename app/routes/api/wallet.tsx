import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";
// import { ethers } from "ethers";
import fs from "fs";

export const loader: LoaderFunction = async ({ request }) => {
  const address: string | undefined =
    new URL(request.url).searchParams.get("address") || undefined;
  invariant(address, "Expected params.address");
  invariant(process.env.ALCHEMY_ETH_RPC, "Expected process.env.RPC_URL");

  const walletData = await fs.promises.readFile("wallet.json", "utf-8");
  const walletObject = JSON.parse(walletData);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return json(walletObject);

  //   const web3 = createAlchemyWeb3(process.env.ALCHEMY_ETH_RPC);
  //   const provider = new ethers.providers.AlchemyProvider(
  //     "homestead",
  //     process.env.ALCHEMY_ETH_API_KEY
  //   );
  //   const ens = await provider.lookupAddress(params.address);
  //   const eth_owned_nfts = await web3.alchemy.getNfts({
  //     owner: params.address,
  //   });
  //   const nfts_to_return: any[] = [];
  //   eth_owned_nfts.ownedNfts.forEach((nft) => {
  //     let nft_cover: string;

  //     if (nft.metadata?.image) {
  //       nft_cover = nft.metadata.image;
  //     } else if (nft.metadata?.image_url) {
  //       nft_cover = nft.metadata?.image_url;
  //     } else {
  //       nft_cover = "";
  //     }

  //     if (nft.title == "" && nft.description == "") {
  //       return;
  //     }

  //     nfts_to_return.push({
  //       title: nft.title,
  //       description: truncateString(nft.metadata?.description, 64),
  //       coverImg: nft_cover.startsWith("ipfs")
  //         ? `https://ipfs.io/${nft_cover.replace("ipfs://", "ipfs/")}`
  //         : nft_cover,
  //       contract: nft.contract.address,
  //     });
  //   });
  //   const walletObject = {
  //     nfts: nfts_to_return,
  //     nftCount: nfts_to_return.length,
  //     ens,
  //   };

  //   return json(walletObject);
};
