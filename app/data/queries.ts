import { gql } from "@apollo/client";

export const getSpaces = gql`
  query getSpaces {
    spaces {
      id
      name
      contract_address
      blockchain
      cover_image
      description
    }
  }
`;

export const getSpaceById = gql`
  query getSpaceById($id: uuid!) {
    spaces_by_pk(id: $id) {
      id
      name
      blockchain
      contract_address
      cover_image
      description
      members: space_memberships_aggregate {
        aggregate {
          count(distinct: true, columns: space_id)
        }
      }
    }
  }
`;

export const getSpaceAndCheckMemberships = gql`
  query getSpaceAndCheckMemberships($id: uuid!, $address: String!) {
    spaces_by_pk(id: $id) {
      contract_address
      space_memberships(where: { wallet: { address: { _eq: $address } } }) {
        space_id
      }
    }
  }
`;

export const getWalletByAddress = gql`
  query getWalletByAddress($address: String!) {
    wallets(where: { address: { _eq: $address } }) {
      id
      address
    }
  }
`;
