import { type Space } from "@prisma/client";
import { json, redirect, type LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { checkSpaceMembership } from "~/models/spaces.server";
import { getWallet } from "~/models/wallet.server";
import { requireUser } from "~/session.server";
import { type WalletWithMemberships } from "~/types";

type LoaderData = { wallet: WalletWithMemberships; space: Space };

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.id, "params.id is required");
  const user = await requireUser(request);
  const isAllowed = await checkSpaceMembership(params.id, user.address);
  if (!isAllowed) {
    return redirect(`/spaces/${params.id}/forbidden`);
  }
  const walletAndMemberships = await getWallet(user.address, true);
  const currentSpace = walletAndMemberships?.memberships.find(
    (m) => m.spaceId === params.id
  )?.space;
  return json({ wallet: walletAndMemberships, space: currentSpace });
};

export default function SpacePage() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <div className="sticky bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <img
                  className="h-16 w-16 rounded-full"
                  src={data.space.coverImage}
                  alt=""
                />
                <h1 className="ml-3 text-2xl font-bold leading-10 text-gray-900 sm:truncate">
                  {data.space.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="lg:max-w-screen-3xl sm:grid sm:px-6 lg:grid-cols-12 lg:gap-8">
          <div className="hidden py-5 sm:col-span-4 lg:col-span-3 lg:block">
            <nav className="sticky top-4 divide-y divide-gray-300">
              <div>
                <p
                  className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  id="communities-headline"
                >
                  My Spaces
                </p>
                {data.wallet.memberships
                  .filter((membership) => membership.space.id != data.space.id)
                  .map((membership) => (
                    <Link
                      to={`/space/${membership.space.id}/feed`}
                      className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      key={membership.space.id}
                    >
                      <span className="truncate">{membership.space.name}</span>
                    </Link>
                  ))}
                <div className="mt-3 space-y-2"></div>
              </div>
            </nav>
          </div>
          <main className="xs:col-span-8 lg:col-span-6">
            <div className="h-screen overflow-y-scroll scroll-smooth shadow-xl scrollbar-hide">
              <Outlet />
            </div>
          </main>
          <aside className="sm:col-span-0 hidden py-5 lg:col-span-3 xl:block">
            <div className="sticky top-4 space-y-4">
              <section>
                <div className="rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2 className="text-base font-medium text-gray-900">
                      {data.space.name}
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        <li className="flex items-center  py-4">
                          <div className="flex-shrink-0"></div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900"></p>
                            <p className="text-sm text-gray-500">
                              {data.space.description}
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
        </div>
      </div>
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
                Spaces<span aria-hidden="true"> &rarr;</span>
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
                Spaces<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
