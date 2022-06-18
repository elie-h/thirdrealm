import type { LoaderFunction } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { generateNonce } from "siwe";

export const loader: LoaderFunction = async () => {
  return new Response(generateNonce(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
