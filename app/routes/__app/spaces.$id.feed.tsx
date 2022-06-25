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
      <div className="mt-6 sm:max-w-xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Welcome!
        </h1>
        <p className="mt-6 text-xl text-gray-500">
          This area is only accessible by token holders
        </p>
      </div>
    </div>
  );
}
