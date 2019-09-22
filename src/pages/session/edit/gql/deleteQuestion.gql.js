import gql from 'graphql-tag';

export default gql`
  mutation DELETE_QUESTION($questionId: String!) {
    deleteQuestion(questionId: $questionId) {
      id
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
