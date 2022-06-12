import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

export default function () {
  const getData = async () => {
    const client = new ApolloClient({
      uri: "http://localhost:8080/v1/graphql",
      cache: new InMemoryCache(),
    });

    try {
      const { data, loading } = await client.query({
        query: gql`
          query Query {
            test {
              Id
              description
              name
            }
          }
        `,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  getData();
  return <div>Hello</div>;
}
