import { LoaderFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { checkSpaceMembership } from "~/models/spaces.server";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.id, "params.id is required");
  const user = await requireUser(request);
  const isAllowed = await checkSpaceMembership(params.id, user.id);
  if (!isAllowed) {
    return redirect(`/spaces/${params.id}/forbidden`);
  }
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
