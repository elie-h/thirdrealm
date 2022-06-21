import { gql } from "@apollo/client";

export const insertWallet = gql`
  mutation insertWallet($address: String!) {
    insert_wallets_one(object: { address: $address }) {
      id
    }
  }
`;

export const addUserToSpace = gql`
  mutation addUserToSpace($space_id: uuid!, $wallet_id: uuid!) {
    insert_space_memberships(
      objects: { space_id: $space_id, wallet_id: $wallet_id }
    ) {
      affected_rows
    }
  }
`;
