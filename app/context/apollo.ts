import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { createContext } from "react";

const domain = "localhost:8080/v1/graphql";
const isBrowser = typeof window !== "undefined";
// @ts-ignore
const initialState = isBrowser ? window.__INITIAL_STATE__ : {};
export function initApollo(ssrMode = true) {
  const httpLink = new HttpLink({
    uri: `http://${domain}`,
  });

  const wsLink = isBrowser
    ? new GraphQLWsLink(
        createClient({
          url: `ws://${domain}`,
        })
      )
    : null;

  return new ApolloClient({
    link: isBrowser
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          // @ts-ignore
          wsLink,
          httpLink
        )
      : httpLink,
    cache: new InMemoryCache().restore(initialState),
    ssrMode,
  });
}
export default createContext(initialState);
