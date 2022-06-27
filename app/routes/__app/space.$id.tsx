import { Link, Outlet } from "@remix-run/react";
import { type LoaderFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { checkSpaceMembership } from "~/models/spaces.server";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.id, "params.id is required");
  const user = await requireUser(request);
  const isAllowed = await checkSpaceMembership(params.id, user.id);
  if (!isAllowed) {
    return redirect(`/spaces/${params.id}/forbidden`);
  }
  return true;
};

export default function Space() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-screen-2xl	 lg:grid-cols-12 lg:gap-8">
        <div className="hidden lg:col-span-4 lg:block xl:col-span-2">
          <nav
            aria-label="Sidebar"
            className="sticky top-4 divide-y divide-gray-300"
          >
            <div>
              <p
                className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                id="communities-headline"
              >
                My Spaces
              </p>
              <div
                className="mt-3 space-y-2"
                aria-labelledby="communities-headline"
              >
                <a
                  href="#"
                  className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="truncate"> BAYC </span>
                </a>

                <a
                  href="#"
                  className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="truncate"> Doodles </span>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <main className="lg:col-span-8 xl:col-span-6">
          <Outlet />
        </main>
        <aside className="hidden xl:col-span-4 xl:block">
          <div className="sticky top-4 space-y-4">
            <section aria-labelledby="who-to-follow-heading">
              <div className="rounded-lg bg-white shadow">
                <div className="p-6">
                  <h2
                    id="who-to-follow-heading"
                    className="text-base font-medium text-gray-900"
                  >
                    About this space
                  </h2>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-4 divide-y divide-gray-200">
                      <li className="flex items-center space-x-3 py-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#">Leonard Krasner</a>
                          </p>
                          <p className="text-sm text-gray-500">
                            <a href="#">@leonardkrasner</a>
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-full bg-rose-50 px-3 py-0.5 text-sm font-medium text-rose-700 hover:bg-rose-100"
                          >
                            {/* <!-- Heroicon name: solid/plus-sm --> */}
                            <svg
                              className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span> Follow </span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      {" "}
                      View all{" "}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </aside>
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
                to="/spaces"
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
