import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImagePreviews from 'layout/ImagePreviews';
import { useSubscription } from 'react-apollo';
import PieChart from 'react-minimal-pie-chart';
import subToQuestionGql from '../gql/subToQuestion.gql';

const Question = ({ question, children, participants }) => {
  const colors = [
    '#1abc9c',
    '#3498db',
    '#9b59b6',
    '#e67e22',
    '#2c3e50',
    '#c0392b'
  ];
  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: '#ecf0f1'
  };
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
      setChoices(newQuestion.choices);
    }
  });

  return (
    <>
      <div className="toast">
        <h3 className="h3">{question.body}</h3>
        {question.images && <ImagePreviews images={question.images} />}
      </div>
      {participants.length > 0 &&
        choices.find(choice => choice.chosenBy && choice.chosenBy.length) && (
          <div style={{ width: '200px', height: '200px' }}>
            <PieChart
              label
              labelStyle={{
                ...defaultLabelStyle
              }}
              animate
              data={choices.map(({ body, chosenBy }, i) => ({
                title: body,
                value: chosenBy.length,
                color: colors[i]
              }))}
            />
          </div>
        )}

      {choices.map((choice, i) => (
        <div className="toast" key={choice.id}>
          <div
            style={{
              width: '10px',
              height: '10px',
              background: colors[i],
              display: 'inline-block'
            }}
          />
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
  question: PropTypes.object.isRequired,
  participants: PropTypes.array
};

Question.defaultProps = {
  children: null,
  participants: []
};

export default Question;
