import gql from 'graphql-tag';

export default gql`
  mutation ANSWER_QUESTION($questionID: ID!, $chooseID: ID!) {
    answerQuestion(questionID: $questionID, chooseID: $chooseID) {
      id
      body
    }
  }
`;
