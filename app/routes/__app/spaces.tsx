import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { typedClient } from "~/apollo.server";
import { Spaces } from "~/data/sdk";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  const { spaces } = await typedClient.getSpaces();
  return spaces;
};

export default function () {
  const data = useLoaderData();
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {data.map((space: Spaces) => (
          <Link to={`/spaces/${space.id}`} key={space.id}>
            <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="aspect-w-3 aspect-h-3 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                  src={space.cover_image}
                  alt={space.name}
                  className="h-full w-full object-contain sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
                  <h3 className="text-sm font-medium text-gray-900">
                    {space.name}
                  </h3>
                  {
                    {
                      ethereum: (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          ETH
                        </span>
                      ),
                      polygon: (
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          POLYGON
                        </span>
                      ),
                      unknown: <></>,
                    }[space.blockchain]
                  }
                </div>
                <p className="text-sm text-gray-500">{space.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
