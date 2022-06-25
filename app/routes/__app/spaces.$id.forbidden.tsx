import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getSpaceById } from "~/models/spaces.server";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant(params.id, "id is required");
  const space = await getSpaceById(params.id);

  if (space) {
    return space;
  }

  throw new Error("Space not found");
};

export default function () {
  const spaceData = useLoaderData();
  return (
    <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Can't join this space!
            </h1>
            <p className="mt-2 overflow-auto text-xs text-base text-gray-500">
              To join this space you need a token from the following contract:{" "}
              {spaceData.collection.contractAddress}
            </p>
            <div className="mt-6">
              <Link
                to="/spaces"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Spaces<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
