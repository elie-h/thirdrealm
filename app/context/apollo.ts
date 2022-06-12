import { createContext } from "react";
import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
const domain = "localhost:8080/v1/graphql";
const isBrowser = typeof window !== "undefined";
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
          wsLink,
          httpLink
        )
      : httpLink,
    cache: new InMemoryCache().restore(initialState),
    ssrMode,
  });
}
export default createContext(initialState);
