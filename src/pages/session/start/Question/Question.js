import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'class-names';
import ImagePreviews from 'layout/ImagePreviews';
import { useSubscription } from 'react-apollo';
import PieChart from 'react-minimal-pie-chart';
import {
  FaQuestion,
  FaImages,
  FaCheckSquare,
  FaChartPie,
  FaChartBar,
  FaUsers
} from 'react-icons/fa';
import subToQuestionGql from '../gql/subToQuestion.gql';
import styles from './Question.module.scss';

const modes = [
  { mode: 'question', faIcon: <FaQuestion /> },
  { mode: 'images', faIcon: <FaImages /> },
  { mode: 'choices', faIcon: <FaCheckSquare /> },
  { mode: 'stats-pie', faIcon: <FaChartPie /> },
  { mode: 'stats-bar', faIcon: <FaChartBar /> }
];

const Choice = ({ choice, color }) => (
  <div className={styles.choiceContainer}>
    <div className={styles.choiceIndicator} style={{ background: color }} />
    <p className={styles.choiceBody}>{choice.body}</p>
    <div className={styles.choiceInfo}>
      {(choice.chosenBy && choice.chosenBy.length) || 0} <FaUsers />
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

const Question = ({ question, participants, index }) => {
  const [mode, setMode] = useState(modes[0].mode);

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

  useEffect(() => {
    setChoices(question.choices);
  }, [question]);

  return (
    <div className={styles.questionContainer}>
      <div className={styles.sidebar}>
        {modes.map(({ mode: m, faIcon }) => (
          <button
            type="button"
            key={m}
            onClick={() => setMode(m)}
            className={cx({ [styles.active]: mode === m })}
          >
            {faIcon}
          </button>
        ))}
      </div>

      <div className={styles.main}>
        {mode === 'question' && (
          <div className={styles.question}>
            <p>{index}</p>
            <h3>{question.body}</h3>
          </div>
        )}

        {mode === 'images' && question.imageUrls && (
          <ImagePreviews images={question.imageUrls} />
        )}

        {mode === 'stats-pie' &&
          participants.length > 0 &&
          choices.find(choice => choice.chosenBy && choice.chosenBy.length) && (
            <div className={styles.pieContainer}>
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

        {mode === 'choices' &&
          choices.map((choice, i) => (
            <Choice key={choice.id} choice={choice} color={colors[i]} />
          ))}

        {mode === 'stats-bar' && <div>Bar chart goes here</div>}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  participants: PropTypes.array,
  index: PropTypes.string
};

Question.defaultProps = {
  participants: [],
  index: ''
};

export default Question;
