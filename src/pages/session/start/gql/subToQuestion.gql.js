import gql from 'graphql-tag';

export default gql`
  subscription SUB_TO_QUESTION($questionID: ID!) {
    subToQuestion(questionID: $questionID) {
      questionID
      question {
        choices {
          id
          body
          correct
          chosenBy
        }
      }
    }
  }
`;
