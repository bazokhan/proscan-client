import gql from 'graphql-tag';

const activeSessions = gql`
  query {
    activeSessions {
      id
      publicId
      status
    }
  }
`;

export default activeSessions;
