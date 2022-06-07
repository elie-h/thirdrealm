import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const address = formData.get("address");
  return redirect(`/app/wallet/${address}`);
};
