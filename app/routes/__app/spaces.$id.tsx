import { gql } from "@apollo/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { serverClient } from "~/apollo.server";
import { requireUser } from "~/session.server";
import { truncateEthAddress } from "~/utils";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { typedClient } from "~/apollo.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant("id" in params, "id is required");
  const { spaces_by_pk } = await typedClient.getSpaceById({ id: params.id });

  if (spaces_by_pk) {
    return spaces_by_pk;
  }

  throw new Error("Space not found");
};

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requireUser(request);
  invariant(process.env.ALCHEMY_ETH_RPC, "Expected process.env.RPC_URL");
  invariant(params.id, "Expected params.id");

  const { spaces_by_pk } = await typedClient.getSpaceAndCheckMemberships({
    id: params.id,
    address: user.address,
  });
  const { contract_address, space_memberships } = spaces_by_pk;

  if (space_memberships.length > 0) {
    // Already a member - redirect them
    return redirect(`/spaces/${params.id}/feed`);
  }

  const web3 = createAlchemyWeb3(process.env.ALCHEMY_ETH_RPC);
  const user_balance = await web3.alchemy.getTokenBalances(user.address, [
    contract_address,
  ]);

  const token_balance = Number(user_balance.tokenBalances[0].tokenBalance);
  invariant(!!!token_balance, "Expected token balance");
  if (token_balance == 0) {
    const addToSpacePayload = await serverClient.mutate({
      mutation: gql`
        mutation AddUserToSpace {
          insert_space_memberships(objects: { space_id: "${params.id}", wallet_id: "${user.id}" }) {
            affected_rows
          }
        }
      `,
    });
    if (addToSpacePayload.errors) {
      return redirect(`/spaces/error`);
    }
    if (addToSpacePayload.data.insert_space_memberships.affected_rows > 0) {
      // Successfully added to space
      return redirect(`/spaces/${params.id}/feed`);
    }
  } else {
    // Not enough tokens! Redirect to a space where a user can join other spaces
    return redirect("/spaces/error");
  }

  return true;
};

export default function () {
  const spaceData = useLoaderData();
  const fetcher = useFetcher();

  return (
    <div className="m:px-6 mx-auto max-w-2xl px-4 sm:py-10 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
      <div className="group rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
        <div className="aspect-w-1 aspect-h-1 rounded-lg">
          <img
            src={spaceData.cover_image}
            alt="Space cover image"
            className="rounded-lg object-cover object-center"
          />
        </div>
      </div>
      <div className="lg:max-w-lg lg:self-end">
        <div className="mt-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {spaceData.name}
          </h1>
        </div>

        <section aria-labelledby="information-heading" className="mt-4">
          <div className="flex items-center">
            <p className="text-lg text-gray-900 sm:text-xl">
              {spaceData.members.aggregate.count} Members
            </p>
          </div>
          <div className="mt-2 flex items-center">
            <p className="text-lg text-gray-500 sm:text-xl">
              {spaceData.blockchain}
            </p>

            <div className="ml-4 border-l border-gray-300 pl-4">
              <div className="flex items-center">
                <p className="text-sm text-gray-500">
                  {truncateEthAddress(spaceData.contract_address)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-6">
            <p className="text-base text-gray-500">{spaceData.description}</p>
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
            to="/spaces"
            className="mb-5 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:mx-5"
          >
            Spaces
          </Link>
        </div>
      </div>
    </div>
  );
}
