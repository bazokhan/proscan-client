import gql from 'graphql-tag';

export default gql`
  mutation PREV_QUESTION($publicId: String!) {
    prevQuestion(publicId: $publicId) {
      questions {
        body
      }
      activeQuestion
    }
  }
`;
