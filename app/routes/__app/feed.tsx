import { useQuery, gql, useSubscription } from "@apollo/client";

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

  console.log(data);

  if (loading) return <p>Loading...</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
