import { gql, useSubscription } from "@apollo/client";
import { useUser } from "~/utils";
import { requireUser } from "~/session.server";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUser(request);
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
