import gql from 'graphql-tag';

export default gql`
  query PROFILE {
    profile {
      id
      email
      username
      sessions {
        id
      }
    }
  }
`;
