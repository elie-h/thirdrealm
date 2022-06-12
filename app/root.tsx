import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import React from "react";
import ApolloContext from "./context/apollo";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "3L",
  viewport: "width=device-width,initial-scale=1",
});

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
