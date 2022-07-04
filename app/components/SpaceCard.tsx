import { type SpaceWithCollection } from "~/types";
import { truncateString } from "~/utils/strings";

interface SpaceCardProps extends React.ComponentPropsWithoutRef<"div"> {
  space: SpaceWithCollection;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-w-3 aspect-h-3 bg-gray-200 group-hover:opacity-75 sm:aspect-none ">
        <img
          src={space.collection.coverImage}
          alt={space.collection.name}
          className="h-full w-full object-contain sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
          <h3 className="text-xl text-gray-900">{space.collection.name}</h3>
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
            }[space.collection.network]
          }
        </div>
        <p className="text-bold h-20 text-center text-sm">
          {truncateString(space.collection.description, 100)}
        </p>
      </div>
    </div>
  );
}
