import { gql } from 'apollo-boost';

const token = gql`
  query TOKEN {
    token {
      id
      __typename
      token
    }
  }
`;

export default token;
