import gql from 'graphql-tag';

export default gql`
  query GUEST {
    guest {
      id
      guestId
      username
      sessionId
      __typename
    }
  }
`;
