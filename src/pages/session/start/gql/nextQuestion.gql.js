import gql from 'graphql-tag';

export default gql`
  mutation NEXT_QUESTION($publicId: String!) {
    nextQuestion(publicId: $publicId) {
      questions {
        body
      }
      activeQuestion
    }
  }
`;
