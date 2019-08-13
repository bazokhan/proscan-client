import gql from 'graphql-tag';

const sessionByID = gql`
  mutation JOIN_SESSION($publicId: String!, $username: String) {
    joinSession(publicId: $publicId, username: $username) {
      id
      username
      session {
        id
        publicId
        author {
          id
          username
          email
          sessions {
            id
            publicId
          }
        }
        status
        questions {
          id
          author {
            id
            username
          }
          body
          imageUrls
          choices {
            id
            body
            correct
            chosenBy
          }
          createdAt
          updatedAt
        }
        activeQuestion
        createdAt
        updatedAt
        guests {
          id
          username
          session {
            id
          }
        }
      }
    }
  }
`;

export default sessionByID;
