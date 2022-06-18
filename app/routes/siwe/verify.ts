import { SiweMessage } from "siwe";
import invariant from "tiny-invariant";
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
