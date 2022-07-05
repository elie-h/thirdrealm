import { Link, useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import SpaceCard from "~/components/SpaceCard";
import { type SpaceWithCollection } from "~/types";

export default function () {
  const walletFetcher = useFetcher();
  useEffect(() => {
    walletFetcher.load("/api/spaces");
  }, []);

  const walletData = walletFetcher.data;
  const loading =
    walletFetcher.state != "idle" || walletFetcher.data == undefined;

  return (
    <div className="py-16">
      <div className="my-10 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-gray-900">
          Your Spaces
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {[...Array(3).keys()].map((i) => (
              <SpaceCard key={i} loading={true} />
            ))}
          </div>
        ) : (
          <div>
            {walletData?.joined.length ? (
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                {walletData?.joined.map((space: SpaceWithCollection) => (
                  <Link to={`/space/${space.id}/feed`} key={space.id}>
                    <SpaceCard space={space} loading={false} />
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
        )}
      </div>

      <div>
        <div className="my-10 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-gray-900">
            Eligible Spaces
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {[...Array(3).keys()].map((i) => (
                <SpaceCard key={i} loading={true} />
              ))}
            </div>
          ) : (
            <div>
              {walletData?.eligible.length ? (
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                  {walletData?.eligible.map((space: SpaceWithCollection) => (
                    <Link to={`/spaces/${space.id}`} key={space.id}>
                      <SpaceCard space={space} loading={false} />
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
          )}
        </div>
      </div>
    </div>
  );
}
