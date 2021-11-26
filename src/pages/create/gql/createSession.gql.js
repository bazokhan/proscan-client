import gql from 'graphql-tag';

export default gql`
  mutation CREATE_SESSION($publicId: String!) {
    createSession(publicId: $publicId) {
      id
      publicId
      author {
        username
      }
      status
      questions {
        body
      }
      activeQuestion
      createdAt
      updatedAt
      guests {
        username
      }
    }
  }
`;
