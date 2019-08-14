import gql from 'graphql-tag';

const activeSessions = gql`
  query {
    activeSessions {
      id
      publicId
      author {
        username
      }
      status
    }
  }
`;

export default activeSessions;
