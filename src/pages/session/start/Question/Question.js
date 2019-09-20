import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImagePreviews from 'layout/ImagePreviews';
import { useSubscription } from 'react-apollo';
import subToQuestionGql from '../gql/subToQuestion.gql';

const Question = ({ question, children }) => {
  const [choices, setChoices] = useState(question.choices);
  useSubscription(subToQuestionGql, {
    variables: {
      questionID: question.id
    },
    fetchPolicy: 'no-cache',
    onSubscriptionData: ({
      subscriptionData: {
        data: {
          subToQuestion: { question: newQuestion }
        }
      }
    }) => {
      console.log(newQuestion.choices);
      setChoices(newQuestion.choices);
    }
  });

  return (
    <>
      <div className="toast">
        <h3 className="h3">{question.body}</h3>
        {question.images && <ImagePreviews images={question.images} />}
      </div>
      {choices.map(choice => (
        <div className="toast" key={choice.id}>
          <p className="p">{choice.body}</p>
          <div className={`toast-${choice.correct ? 'success' : 'error'}`}>
            Chosen By: {(choice.chosenBy && choice.chosenBy.length) || 0}{' '}
            participants
          </div>
          {children}
        </div>
      ))}
    </>
  );
};

Question.propTypes = {
  children: PropTypes.node,
  question: PropTypes.object.isRequired
};

Question.defaultProps = {
  children: null
};

export default Question;
