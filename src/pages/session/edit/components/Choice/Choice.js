import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import styles from './Choice.module.scss';

const Choice = ({
  choice,
  children,
  handleChoiceBodyChange,
  handleDeleteChoice,
  handleChoiceCorrectToggle
}) => {
  const handleBodyChange = e => handleChoiceBodyChange(choice, e.target.value);
  const handleCorrectToggle = () => handleChoiceCorrectToggle(choice);
  const handleDelete = () => handleDeleteChoice(choice);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <input
            type="checkbox"
            checked={choice.correct}
            onChange={handleCorrectToggle}
          />
        </div>
        <div className={styles.middle}>
          <input
            type="text"
            className="input"
            placeholder="Enter choice text"
            name={`bodyof${choice.id}`}
            onChange={handleBodyChange}
            value={choice.body}
          />
          <div className={`toast-${choice.correct ? 'success' : 'error'}`}>
            This choice is {choice.correct ? 'Correct' : 'Wrong'}
          </div>
        </div>
        <div className={styles.right}>
          <button onClick={handleDelete} className="button-fab" type="button">
            <ClearIcon />
          </button>
        </div>
      </div>
      {children}
    </>
  );
};

Choice.propTypes = {
  children: PropTypes.node,
  choice: PropTypes.object.isRequired,
  handleChoiceBodyChange: PropTypes.func.isRequired,
  handleDeleteChoice: PropTypes.func.isRequired,
  handleChoiceCorrectToggle: PropTypes.func.isRequired
};

Choice.defaultProps = {
  children: null
};

export default Choice;
