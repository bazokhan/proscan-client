import gql from 'graphql-tag';

export default gql`
  mutation CREATE_QUESTION($publicId: String!, $question: InputQuestion!) {
    createQuestion(publicId: $publicId, question: $question) {
      id
      author {
        username
      }
      session {
        publicId
      }
      body
      imageUrls
      choices {
        id
        body
        correct
      }
      createdAt
      updatedAt
    }
  }
`;
