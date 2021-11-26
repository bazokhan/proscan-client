import React from 'react';
import PropTypes from 'prop-types';
import cx from 'class-names';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import styles from './Choice.module.scss';

const Choice = ({ choice }) => (
  <div className={styles.container}>
    <div
      className={cx(styles.buttonFab, {
        [styles.correct]: choice.correct
      })}
    >
      {choice.correct ? <FaRegCheckCircle /> : <FaRegTimesCircle />}
    </div>
    <p className={styles.choiceBody}>{choice.body}</p>
  </div>
);

Choice.propTypes = {
  choice: PropTypes.object.isRequired
};

export default Choice;
