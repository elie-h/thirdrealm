import { type ActionFunction, redirect } from "@remix-run/server-runtime";
import { SiweMessage } from "siwe";
import invariant from "tiny-invariant";
import {
  createWallet,
  getWallet,
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
  const redirectTo = safeRedirect(form.get("redirectTo"), "/home");

  try {
    await siweMessage.validate(signature.toString());
    const existingWallet = await getWallet(siweMessage.address);

    if (!existingWallet) {
      const newWallet = await createWallet(siweMessage.address);
      userId = newWallet.address;
    } else {
      await updateLastSeen(existingWallet.address);
      userId = existingWallet.address;
    }

    return createUserSession({
      request,
      userId,
      remember: false,
      redirectTo,
    });
  } catch (error) {
    console.log(error);
    throw new Response("Error - Something went wrong", { status: 400 });
  }
};

export async function loader() {
  return redirect("/");
}
