import {
  json,
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { checkTokenOwnership } from "~/data/blockchain.server";
import {
  getSpaceAndMembersById,
  getSpaceById,
  upsertSpaceMembership,
} from "~/models/spaces.server";
import { requireUser } from "~/session.server";
import { type SpaceWithCollection } from "~/types";
import { truncateEthAddress } from "~/utils";

type LoaderData = { space: SpaceWithCollection };

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant(params.id, "id is required");
  const space = await getSpaceById(params.id);

  if (!space) {
    throw new Response("Space not found", { status: 404 });
  }

  const data: LoaderData = { space };
  return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request);
  invariant(process.env.ALCHEMY_ETH_RPC, "Expected process.env.RPC_URL");
  invariant(params.id, "Expected params.id");

  const spaceAndMembers = await getSpaceAndMembersById(params.id, user.id);
  invariant(spaceAndMembers, "Space not found");

  const isAllowed = await checkTokenOwnership(
    spaceAndMembers.collection,
    user.id
  );

  if (isAllowed) {
    await upsertSpaceMembership(params.id, user.id);
    return redirect(`/space/${params.id}/feed`);
  } else {
    // Not enough tokens! Redirect to a space where a user can join other spaces
    return redirect(`/spaces/${params.id}/forbidden`);
  }
};

export default function () {
  const data = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  return (
    <div className="m:px-6 mx-auto mt-10 max-w-2xl px-4 pb-10 sm:py-10 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
      <div className="group rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
        <div className="aspect-w-1 aspect-h-1 rounded-lg">
          <img
            src={data.space.collection.coverImage}
            alt="Space cover"
            className="rounded-lg object-cover object-center"
          />
        </div>
      </div>
      <div className="lg:max-w-lg lg:self-end">
        <div className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {data.space.collection.name}
          </h1>
        </div>

        <section aria-labelledby="information-heading" className="mt-4">
          <div className="flex items-center">
            <p className="text-lg text-gray-900 sm:text-xl">
              {data.space._count.members} Members
            </p>
          </div>
          <div className="mt-2 flex items-center">
            <p className="text-lg text-gray-500 sm:text-xl">
              {data.space.collection.network}
            </p>

            <div className="ml-4 border-l border-gray-300 pl-4">
              <div className="flex items-center">
                <p className="text-sm text-gray-500">
                  {truncateEthAddress(data.space.collection.contractAddress)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-6">
            <p className="text-base text-gray-500">
              {data.space.collection.description}
            </p>
          </div>
        </section>
        <div className="mt-10 sm:flex">
          <button
            onClick={() => fetcher.submit({ id: "1" }, { method: "post" })}
            className="mb-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:mx-5"
          >
            {fetcher.state !== "idle" ? "Loading ..." : "Join"}
          </button>

          <Link
            to="/home"
            className="mb-5 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:mx-5"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
