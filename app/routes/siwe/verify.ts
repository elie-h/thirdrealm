import { gql } from "@apollo/client";
import { redirect } from "@remix-run/server-runtime";
import { SiweMessage } from "siwe";
import invariant from "tiny-invariant";
import { serverClient } from "~/apollo.server";
import { createUserSession } from "~/session.server";
import { safeRedirect } from "~/utils";

export async function action({ request }: { request: Request }) {
  const form = await request.formData();
  const message = form.get("message");
  const signature = form.get("signature");
  invariant(message, "Message is required");
  invariant(signature, "Signature is required");
  const siweMessage = new SiweMessage(message.toString());
  const redirectTo = safeRedirect(form.get("redirectTo"), "/feed");

  try {
    await siweMessage.validate(signature.toString());
    const res = await serverClient.mutate({
      mutation: gql`
        mutation WalletMutation {
          insert_wallets_one(object: { address: "${siweMessage.address}" }) {
            id
          }
        }
      `,
    });

    if (res.errors) {
      if (res.errors[0].extensions.code == "validation-failed") {
        throw new Error("Malformed wallet");
      }
      if (res.errors[0].extensions.code == "constraint-violation") {
        console.log("Wallet already registered");
      }
    }

    return createUserSession({
      request,
      userId: siweMessage.address,
      remember: false,
      redirectTo,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loader() {
  return redirect("/");
}
