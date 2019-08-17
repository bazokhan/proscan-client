import React from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';

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
      <input
        type="checkbox"
        checked={choice.correct}
        onChange={handleCorrectToggle}
      />
      <input
        type="text"
        className="input"
        placeholder="Enter question text"
        name={`bodyof${choice.id}`}
        onChange={handleBodyChange}
        value={choice.body}
      />
      <div className={`toast-${choice.correct ? 'success' : 'error'}`}>
        This choice is {choice.correct ? 'Correct' : 'Wrong'}
      </div>
      <button onClick={handleDelete} className="button-small" type="button">
        <ClearIcon />
      </button>

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
