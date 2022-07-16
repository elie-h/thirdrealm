import { type Community } from "@prisma/client";
import { Link, useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import CommunityCard from "~/components/CommunityCard";

export default function () {
  const walletFetcher = useFetcher();
  useEffect(() => {
    walletFetcher.load("/api/communities");
  }, []);

  const walletData = walletFetcher.data;
  const loading =
    walletFetcher.state != "idle" || walletFetcher.data == undefined;

  return (
    <div className="min-h-screen py-16">
      <div className="my-10 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-gray-900">
          Your Communities
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {[...Array(3).keys()].map((i) => (
              <CommunityCard key={i} loading={true} />
            ))}
          </div>
        ) : (
          <div>
            {walletData?.joined.length ? (
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                {walletData?.joined.map((community: Community) => (
                  <Link to={`/c/${community.id}/feed`} key={community.id}>
                    <CommunityCard community={community} loading={false} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-bold text-l mt-1">
                  You've joined all the communities you own a token for!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <div className="my-10 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-gray-900">
            Eligible Communities
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
              {[...Array(3).keys()].map((i) => (
                <CommunityCard key={i} loading={true} />
              ))}
            </div>
          ) : (
            <div>
              {walletData?.eligible.length ? (
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                  {walletData?.eligible.map((community: Community) => (
                    <Link
                      to={`/communities/${community.id}`}
                      key={community.id}
                    >
                      <CommunityCard community={community} loading={false} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-bold text-l mt-1">
                    You've joined all the communities you own a token for!
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
