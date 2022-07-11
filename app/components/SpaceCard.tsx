import { type Space } from "@prisma/client";
import { truncateString } from "~/utils/strings";

interface SpaceCardProps extends React.ComponentPropsWithoutRef<"div"> {
  space?: Space;
  loading: boolean;
}

export default function SpaceCard({ space, loading }: SpaceCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div>
        <div className="aspect-w-3 aspect-h-3 bg-gray-200 group-hover:opacity-75 sm:aspect-none ">
          {loading ? (
            <div className="animate-pulse rounded-xl bg-gray-200 object-contain sm:h-72 sm:w-full"></div>
          ) : (
            <img
              src={space?.coverImage}
              alt={space?.name}
              className="h-full w-full object-contain sm:h-full sm:w-full"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          {loading ? (
            <div className="h-14 w-full animate-pulse rounded-2xl bg-gray-200"></div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
                <h3 className="text-xl text-gray-900">{space?.name}</h3>
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
                  }[space?.network || "ethereum"]
                }
              </div>
              <p className="text-bold h-20 text-center text-sm">
                {truncateString(space?.description, 100)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
