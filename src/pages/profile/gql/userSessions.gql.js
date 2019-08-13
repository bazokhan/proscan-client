import gql from 'graphql-tag';

const userSessions = gql`
  query USER_SESSIONS {
    userSessions {
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
`;

export default userSessions;
