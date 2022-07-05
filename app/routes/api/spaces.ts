import type { LoaderFunction } from "@remix-run/node";
import { getWalletSpaces } from "~/data/blockchain.server";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const spaces = await getWalletSpaces(user.address);
  return spaces;
};
