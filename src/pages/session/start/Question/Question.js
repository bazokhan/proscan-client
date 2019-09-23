import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImagePreviews from 'layout/ImagePreviews';
import { useSubscription } from 'react-apollo';
import PieChart from 'react-minimal-pie-chart';
import subToQuestionGql from '../gql/subToQuestion.gql';
import styles from './Question.module.scss';

const Choice = ({ choice, color }) => (
  <div className={styles.choiceContainer}>
    <div className={styles.choiceIndicator} style={{ background: color }} />
    <p className={styles.choiceBody}>{choice.body}</p>
    <div className={styles.choiceInfo}>
      Chosen By: {(choice.chosenBy && choice.chosenBy.length) || 0} participants
    </div>
  </div>
);

Choice.propTypes = {
  choice: PropTypes.object.isRequired,
  color: PropTypes.string
};

Choice.defaultProps = {
  color: '#000'
};

const Question = ({ question, participants }) => {
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
    <div className={styles.questionContainer}>
      <div className={styles.sidebar}>S</div>
      <div className={styles.main}>
        <h3 className="h3">{question.body}</h3>
        {question.imageUrls && <ImagePreviews images={question.imageUrls} />}

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
          <Choice key={choice.id} choice={choice} color={colors[i]} />
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  participants: PropTypes.array
};

Question.defaultProps = {
  participants: []
};

export default Question;
