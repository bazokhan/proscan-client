import React from 'react';
import PropTypes from 'prop-types';
import cx from 'class-names';
import { FaRegCheckCircle, FaRegTimesCircle, FaTrashAlt } from 'react-icons/fa';
import styles from './Choice.module.scss';

const Choice = ({ choice, handleDeleteChoice, handleUpdateChoice }) => (
  <div className={styles.container}>
    <label
      htmlFor={`${choice.id}-isCorrect`}
      className={cx(styles.buttonFab, {
        [styles.correct]: choice.correct
      })}
    >
      <input
        type="checkbox"
        id={`${choice.id}-isCorrect`}
        checked={choice.correct}
        onChange={() => handleUpdateChoice(choice.body, !choice.correct)}
      />
      {choice.correct ? <FaRegCheckCircle /> : <FaRegTimesCircle />}
    </label>

    {/* <input
      type="checkbox"
      checked={choice.correct}
      onChange={() => handleUpdateChoice(choice.body, !choice.correct)}
    /> */}

    <input
      type="text"
      className={styles.choiceBody}
      placeholder="Enter choice text"
      name={`bodyof${choice.id}`}
      onChange={e => handleUpdateChoice(e.target.value, choice.correct)}
      value={choice.body}
    />
    {/* <div className={`toast-${choice.correct ? 'success' : 'error'}`}>
      This choice is {choice.correct ? 'Correct' : 'Wrong'}
    </div> */}

    <button
      onClick={() => handleDeleteChoice(choice.id)}
      className={styles.buttonFab}
      type="button"
    >
      <FaTrashAlt />
    </button>
  </div>
);

Choice.propTypes = {
  handleDeleteChoice: PropTypes.func.isRequired,
  handleUpdateChoice: PropTypes.func.isRequired,
  choice: PropTypes.object.isRequired
};

export default Choice;
