import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getWalletData } from "~/data/blockchain.server";

export const loader: LoaderFunction = async ({ request }) => {
  const address: string | undefined =
    new URL(request.url).searchParams.get("address") || undefined;
  invariant(address, "Expected params.address");
  invariant(process.env.ALCHEMY_ETH_RPC, "Expected process.env.RPC_URL");
  const walletObject = await getWalletData(address);
  return json(walletObject);
};
