import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import React from "react";
import ApolloContext from "./context/apollo";
import { getUser } from "./session.server";

import rainbowKitStylesheetUrl from "@rainbow-me/rainbowkit/styles.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: rainbowKitStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "3L",
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

export function ErrorBoundary({ error }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="description" content="W3B" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">Somebody hurt!</body>
    </html>
  );
}

export default function App() {
  const initialState = React.useContext(ApolloContext);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="description" content="W3B" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${JSON.stringify(
              initialState
            ).replace(/</g, "\\u003c")};`,
          }}
        />
      </body>
    </html>
  );
}
