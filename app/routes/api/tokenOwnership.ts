import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getOwnersForCollection } from "~/data/blockchain.server";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const contractAddress: string | undefined =
      new URL(request.url).searchParams.get("contractAddress") || undefined;
    const walletAddress: string | undefined =
      new URL(request.url).searchParams.get("walletAddress") || undefined;
    const network: string | undefined =
      new URL(request.url).searchParams.get("network") || undefined;
    invariant(walletAddress, "Expected params.address");
    invariant(contractAddress, "Expected contractAddress");
    invariant(process.env.ALCHEMY_ETH_RPC, "Expected process.env.RPC_URL");
    invariant(
      network === "ethereum" || network === "polygon",
      "Expected network"
    );
    const count = await getOwnersForCollection(
      contractAddress,
      walletAddress,
      network
    );

    return json(
      {
        contractAddress,
        walletAddress,
        network,
        ownedTokens: count,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Response(error, {
      status: 500,
    });
  }
};
