import gql from 'graphql-tag';

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
