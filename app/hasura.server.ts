import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const serverClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: "http://localhost:8080/v1/graphql",
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
  headers: { "x-hasura-admin-secret": "my-secret-key" },
  defaultOptions: {
    mutate: { errorPolicy: "all" },
  },
});

export default serverClient;
