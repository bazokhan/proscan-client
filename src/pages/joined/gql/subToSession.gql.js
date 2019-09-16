import gql from 'graphql-tag';

export default gql`
  subscription SUB_TO_SESSION($publicId: String!) {
    subToSession(publicId: $publicId) {
      mutation
      publicId
      session {
        activeQuestion
        guests {
          id
          username
        }
      }
    }
  }
`;
