import { type Community } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import CommunityCard from "~/components/CommunityCard";
import { getWallet } from "~/models/wallet.server";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const data = await getWallet(user.address);
  if (data === null) {
    throw new Response("Wallet not found", { status: 404 });
  }
  return json({ wallet: data });
};

export default function () {
  const { wallet } = useLoaderData();
  const walletFetcher = useFetcher();
  useEffect(() => {
    walletFetcher.load("/api/communities");
  }, []);

  const walletData = walletFetcher.data;
  const loading =
    walletFetcher.state != "idle" || walletFetcher.data == undefined;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <h3 className="font-lg text-xl font-bold leading-6">Welcome home,</h3>
      <div className="my-5 border-t">
        <div className="flex items-center justify-between py-3 ">
          <h3 className="font-lg my-5 text-xl font-bold leading-6">
            Your Communities
          </h3>
          {/* <Link
            to={`/communities/new`}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-1 mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New
          </Link> */}
        </div>
        {wallet?.memberships.length ? (
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {wallet?.memberships.map((membership: any) => (
              <Link
                to={`/c/${membership.community.id}/feed`}
                key={membership.community.id}
              >
                <CommunityCard
                  community={membership.community}
                  loading={false}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-bold text-l mt-1">
              You haven't joined any communities yet!
            </p>
          </div>
        )}
      </div>

      <div className="border-t ">
        <h3 className="font-lg my-10 text-xl font-bold leading-6">
          Eligible Communities
        </h3>
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
                  <Link to={`/communities/${community.id}`} key={community.id}>
                    <CommunityCard community={community} loading={false} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-bold text-l mt-1">
                  You've joined all the available communities you own a token
                  for!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
