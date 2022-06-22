import { Link, useParams } from "@remix-run/react";

export default function () {
  const { contract_address } = useParams();
  return (
    <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Can't join this space
            </h1>
            <p className="mt-2 text-base text-gray-500">
              To join this space you need a token from the following contract:{" "}
              {contract_address}
            </p>
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
