import {
  ApolloClient,
  ApolloError,
  createHttpLink,
  InMemoryCache,
  MutationOptions,
  QueryOptions,
} from "@apollo/client";
import { DocumentNode } from "graphql";

import { getSdk, Requester } from "~/data/sdk";

export type ApolloRequesterOptions<V, R> =
  | Omit<QueryOptions<V>, "variables" | "query">
  | Omit<MutationOptions<R, V>, "variables" | "mutation">;

const validDocDefOps = ["mutation", "query", "subscription"];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getSdkApollo<C>(client: ApolloClient<C>) {
  const requester: Requester = async <R, V>(
    doc: DocumentNode,
    variables: V,
    options?: ApolloRequesterOptions<V, R>
  ): Promise<R> => {
    // Valid document should contain *single* query or mutation unless it's has a fragment
    if (
      doc.definitions.filter(
        (d) =>
          d.kind === "OperationDefinition" &&
          validDocDefOps.includes(d.operation)
      ).length !== 1
    ) {
      throw new Error(
        "DocumentNode passed to Apollo Client must contain single query or mutation"
      );
    }

    const definition = doc.definitions[0];

    // Valid document should contain *OperationDefinition*
    if (definition.kind !== "OperationDefinition") {
      throw new Error(
        "DocumentNode passed to Apollo Client must contain single query or mutation"
      );
    }

    switch (definition.operation) {
      case "mutation": {
        const response = await client.mutate<R, V>({
          mutation: doc,
          variables,
          ...options,
        });

        if (response.errors) {
          throw new ApolloError(response.errors);
        }

        if (response.data === undefined || response.data === null) {
          throw new Error("No data presented in the GraphQL response");
        }

        return response.data;
      }
      case "query": {
        const response = await client.query<R, V>({
          query: doc,
          variables,
          ...options,
        });

        if (response.errors) {
          throw new ApolloError(response.errors);
        }

        if (response.data === undefined || response.data === null) {
          throw new Error("No data presented in the GraphQL response");
        }

        return response.data;
      }
      case "subscription": {
        throw new Error(
          "Subscription requests through SDK interface are not supported"
        );
      }
    }
  };

  return getSdk(requester);
}

export const serverClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.HASURA_GRAPHQL_ENDPOINT,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
  headers: { "x-hasura-admin-secret": "my-secret-key" },
  defaultOptions: {
    mutate: { errorPolicy: "all" },
  },
});

export const apolloServerClient = getSdkApollo(serverClient);
