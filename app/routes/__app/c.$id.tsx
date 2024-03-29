import { type Community } from "@prisma/client";
import { json, redirect, type LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { checkCommunityMembership } from "~/models/community.server";
import { getWallet } from "~/models/wallet.server";
import { requireUser } from "~/session.server";
import { type WalletWithMemberships } from "~/types";

type LoaderData = { wallet: WalletWithMemberships; community: Community };

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.id, "params.id is required");
  const user = await requireUser(request);
  const isAllowed = await checkCommunityMembership(params.id, user.address);
  if (!isAllowed) {
    return redirect(`/communities/${params.id}/forbidden`);
  }
  const walletAndMemberships = await getWallet(user.address);
  const currentCommunity = walletAndMemberships?.memberships.find(
    (m) => m.communityId === params.id
  )?.community;
  return json({ wallet: walletAndMemberships, community: currentCommunity });
};

export default function CommunityPage() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="mx-auto px-0 sm:grid sm:px-12 lg:max-w-screen-2xl lg:grid-cols-12 lg:gap-8">
      <aside className="xs:col-span-0 hidden py-5 lg:col-span-4 lg:block">
        <div className="sticky top-4 space-y-4">
          <section>
            <div className="rounded-lg">
              <div className="p-6">
                <img
                  className="mb-4 w-3/4 rounded-lg"
                  src={data.community.coverImage}
                  alt="Community cover"
                />
                <h2 className="text-base text-xl font-bold text-gray-900">
                  {data.community.name}
                </h2>
                <div className="mt-4 flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    <li className="flex items-center  py-4">
                      <div className="flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">
                          {data.community.description}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>
      <aside className="mx-4 block py-5 sm:mx-16 lg:hidden">
        <div className="sticky top-4 space-y-4">
          <div className="mx-auto rounded-lg">
            <img
              className="mx-auto w-1/3 rounded-lg"
              src={data.community.coverImage}
              alt="Community cover"
            />
            <h2 className="mt-4 text-center text-base text-xl font-bold text-gray-900">
              {data.community.name}
            </h2>
            <div className="mt-4 flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                <li className="flex items-center  py-4">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-center text-xs font-bold sm:text-sm">
                      {data.community.description}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <main className="xs:col-span-8 py-5 lg:col-span-8">
        <div className="h-screen overflow-y-scroll scroll-smooth scrollbar-hide">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  if (process.env.NODE_ENV === "development") {
    console.log(error.stack);
  }
  return (
    <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Something went wrong!
            </h1>
            <p className="mt-2 text-base text-gray-500">{error.message}</p>
            <p className="mt-2 text-base text-gray-500">{error.stack}</p>
            {process.env.NODE_ENV === "development" ? (
              <p className="mt-2 text-base text-gray-500">{error.stack}</p>
            ) : null}
            <div className="mt-6">
              <Link
                to="/home"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Communities<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Something went wrong!
            </h1>
            <p className="mt-2 text-base text-gray-500">{caught.statusText}</p>
            <p className="mt-2 text-base text-gray-500">{caught.status}</p>

            <div className="mt-6">
              <Link
                to="/home"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Communities<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
