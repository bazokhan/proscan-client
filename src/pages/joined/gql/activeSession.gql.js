import gql from 'graphql-tag';

export default gql`
  query ACTIVE_SESSION($publicId: String!) {
    activeSession(publicId: $publicId) {
      activeQuestion
      questions {
        id
        body
        imageUrls
        choices {
          id
          body
        }
      }
    }
  }
`;
