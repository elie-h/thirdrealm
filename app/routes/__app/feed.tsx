import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
  useSubscription,
} from "@apollo/client";
import type { LoaderFunction } from "@remix-run/node";
import { requireUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUser(request);
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "http://localhost:8080/v1/graphql",
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        channels {
          description
          id
          name
        }
      }
    `,
  });
  return true;
};

export default function () {
  const { data, loading, error } = useSubscription(gql`
    subscription MySubscription {
      test {
        description
        name
        Id
      }
    }
  `);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1>Feed</h1>
      <p>This is a private area</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
