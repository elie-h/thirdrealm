import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { getUser } from "./session.server";

import rainbowKitStylesheetUrl from "@rainbow-me/rainbowkit/styles.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { Web3Wrapper } from "./components/Web3";
import NavBar from "./components/NavBar";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: rainbowKitStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Third Realm",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export function ErrorBoundary({ error }: { error: Error }) {
  if (process.env.NODE_ENV === "development") {
    console.log(error.stack);
  }
  return (
    <Web3Wrapper>
      <NavBar />
      <div className="flex min-h-full flex-col bg-white pt-16 pb-12">
        <main className="mx-auto flex w-full flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
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
                  Home<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Web3Wrapper>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Third Realm" />
        <Meta />
        <Links />
      </head>
      <body className="h-full font-body">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
