import { gql } from "@apollo/client";
import { ActionFunction, redirect } from "@remix-run/server-runtime";
import { SiweMessage } from "siwe";
import invariant from "tiny-invariant";
import { serverClient } from "~/apollo.server";
import { createUserSession } from "~/session.server";
import { safeRedirect } from "~/utils";
import { apolloServerClient } from "~/apollo.server";

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
    const { wallets } = await apolloServerClient.getWalletByAddress({
      address: siweMessage.address,
    });

    if (wallets.length === 0) {
      const { insert_wallets_one } = await apolloServerClient.insertWallet({
        address: siweMessage.address,
      });

      userId = insert_wallets_one.id;

      if (insert_wallets_one.errors) {
        if (
          insert_wallets_one.errors[0].extensions.code == "validation-failed"
        ) {
          throw new Error("Malformed wallet");
        }
        if (
          insert_wallets_one.errors[0].extensions.code == "constraint-violation"
        ) {
          console.log("Wallet already registered");
        }
      }
    } else {
      userId = wallets[0].id;
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
