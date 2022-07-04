import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import SpaceCard from "~/components/SpaceCard";
import { getWalletSpaces } from "~/data/blockchain.server";
import { requireUser } from "~/session.server";
import { type SpaceWithCollection } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const spaces = await getWalletSpaces(user.address);
  return spaces;
};

export default function () {
  const data = useLoaderData();
  return (
    <div className="py-16">
      {data.joined.length == 0 && data.eligible.length == 0 ? (
        <div className="text-center">
          <h3 className="mt-8 text-xl font-medium text-gray-900">
            No tokens found!
          </h3>
          <p className="text-bold text-md mt-1">
            To join a space you need to have eligible NFTs in your wallet.
          </p>
        </div>
      ) : (
        <div>
          <div className="mx-auto my-10 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {data.joined.length > 0 ? (
              <div>
                <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-gray-900">
                  Your Spaces
                </h2>
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                  {data.joined.map((space: SpaceWithCollection) => (
                    <Link to={`/space/${space.id}/feed`} key={space.id}>
                      <SpaceCard space={space} />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="mt-2 text-xl font-medium text-gray-900">
                  Join a space!
                </h3>
                <p className="text-bold text-md mt-1">
                  Get started by joining a space you own a token for below.
                </p>
              </div>
            )}
          </div>
          <div className="my-10 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-gray-900">
              Eligible Spaces
            </h2>
            {data.eligible.length ? (
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                {data.eligible.map((space: SpaceWithCollection) => (
                  <Link to={`/spaces/${space.id}`} key={space.id}>
                    <SpaceCard space={space} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-bold text-l mt-1">
                  You've joined all the spaces you own a token for!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
