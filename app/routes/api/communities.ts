import type { LoaderFunction } from "@remix-run/node";
import { getWalletCommunities } from "~/data/blockchain.server";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const communities = await getWalletCommunities(user.address);
  return communities;
};
