import { ActionFunction, redirect } from "@remix-run/server-runtime";
import { SiweMessage } from "siwe";
import invariant from "tiny-invariant";
import {
  createWallet,
  getWalletByAddress,
  updateLastSeen,
} from "~/models/wallet.server";
import { createUserSession } from "~/session.server";
import { safeRedirect } from "~/utils";

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const message = form.get("message");
  const signature = form.get("signature");
  let userId: string;
  invariant(message, "Message is required");
  invariant(signature, "Signature is required");
  const siweMessage = new SiweMessage(message.toString());
  const redirectTo = safeRedirect(form.get("redirectTo"), "/spaces");

  try {
    await siweMessage.validate(signature.toString());
    const existingWallet = await getWalletByAddress(siweMessage.address);

    if (!!!existingWallet) {
      const newWallet = await createWallet(siweMessage.address);
      userId = newWallet.id;
    } else {
      await updateLastSeen(existingWallet.id);
      userId = existingWallet.id;
    }

    return createUserSession({
      request,
      userId: userId,
      remember: false,
      redirectTo,
    });
  } catch (error) {
    console.log(error);
    throw new Response("Error", { status: 400 });
  }
};

export async function loader() {
  return redirect("/");
}
