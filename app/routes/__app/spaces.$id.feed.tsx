import type { LoaderFunction } from "@remix-run/node";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return true;
};

export default function () {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1>Feed</h1>
      <p>This is a private area for token holders only!</p>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
