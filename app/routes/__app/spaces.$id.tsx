import { useQuery, gql } from "@apollo/client";
import { useParams } from "@remix-run/react";

export default function () {
  const { id: space_id } = useParams();
  console.log(space_id);
  const { data, loading, error } = useQuery(gql`
    query MyQuery {
      spaces_by_pk(id: "${space_id}") {
        id
        name
        contract_address
        channels {
          name
        }
      }
    }
  `);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <pre>
        <p>hi</p>
      </pre>
      ;
    </div>
  );
}
