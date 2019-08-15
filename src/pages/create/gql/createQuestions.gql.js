import gql from 'graphql-tag';

export default gql`
  mutation CREATE_QUESTIONS($publicId: String!, $data: [InputQuestion]) {
    createQuestions(publicId: $publicId, data: $data) {
      id
      publicId
      author {
        username
      }
      questions {
        body
      }
      activeQuestion
    }
  }
`;
