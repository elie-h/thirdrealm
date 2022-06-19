import { gql } from "@apollo/client";
import { ActionFunction, redirect } from "@remix-run/server-runtime";
import { SiweMessage } from "siwe";
import invariant from "tiny-invariant";
import { serverClient } from "~/apollo.server";
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
  const redirectTo = safeRedirect(form.get("redirectTo"), "/feed");

  try {
    await siweMessage.validate(signature.toString());

    const { data: userWallets } = await serverClient.query({
      query: gql`
      query UserWallet {
        wallets(where: {address: {_eq: "${siweMessage.address}"}}) {
          id
          address
        }
      }`,
    });

    if (userWallets.wallets.length === 0) {
      const { data: addUser } = await serverClient.mutate({
        mutation: gql`
          mutation WalletMutation {
            insert_wallets_one(object: { address: "${siweMessage.address}" }) {
              id
            }
          }`,
      });

      userId = addUser.insert_wallets_one.id;

      if (addUser.errors) {
        if (addUser.errors[0].extensions.code == "validation-failed") {
          throw new Error("Malformed wallet");
        }
        if (addUser.errors[0].extensions.code == "constraint-violation") {
          console.log("Wallet already registered");
        }
      }
    } else {
      userId = userWallets.wallets[0].id;
    }

    return createUserSession({
      request,
      userId: userId,
      remember: false,
      redirectTo,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export async function loader() {
  return redirect("/");
}
