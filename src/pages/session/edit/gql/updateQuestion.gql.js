import gql from 'graphql-tag';

export default gql`
  mutation UPDATE_QUESTION($questionId: String!, $question: InputQuestion) {
    updateQuestion(questionId: $questionId, question: $question) {
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
