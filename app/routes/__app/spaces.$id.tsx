import { gql } from "@apollo/client";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { serverClient } from "~/apollo.server";
import { requireUser } from "~/session.server";
import { truncateEthAddress } from "~/utils";

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant("id" in params, "id is required");
  const { data } = await serverClient.query({
    query: gql`
      query SpaceById {
        spaces_by_pk(id: "${params.id}") {
          id
          name
          blockchain
          contract_address
          cover_image
          description
          space_memberships_aggregate {
            aggregate {
              count(distinct: true, columns: space_id)
            }
          }
        }
      }
    `,
  });

  if (data) {
    return {
      id: data.spaces_by_pk.id,
      name: data.spaces_by_pk.name,
      blockchain: data.spaces_by_pk.blockchain,
      contract_address: data.spaces_by_pk.contract_address,
      cover_image: data.spaces_by_pk.cover_image,
      description: data.spaces_by_pk.description,
      membersCount:
        data.spaces_by_pk.space_memberships_aggregate.aggregate.count,
    };
  }

  throw new Error("Space not found");
};

export default function () {
  const spaceData = useLoaderData();

  return (
    <div className="m:px-6 mx-auto max-w-2xl px-4 sm:py-10 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
      <div className="group rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
        <div className="aspect-w-1 aspect-h-1 rounded-lg">
          <img
            src={spaceData.cover_image}
            alt="Space cover image"
            className="object-cover object-center"
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
              {spaceData.membersCount} Members
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
            type="submit"
            className="mb-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:mx-5"
          >
            Join
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
