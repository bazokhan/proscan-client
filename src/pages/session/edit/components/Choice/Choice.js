import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

const Choice = ({ choice, handleDeleteChoice, handleUpdateChoice }) => (
  <div>
    <input
      type="checkbox"
      checked={choice.correct}
      onChange={() => handleUpdateChoice(choice.body, !choice.correct)}
    />

    <input
      type="text"
      className="input"
      placeholder="Enter choice text"
      name={`bodyof${choice.id}`}
      onChange={e => handleUpdateChoice(e.target.value, choice.correct)}
      value={choice.body}
    />
    <div className={`toast-${choice.correct ? 'success' : 'error'}`}>
      This choice is {choice.correct ? 'Correct' : 'Wrong'}
    </div>

    <button
      onClick={() => handleDeleteChoice(choice.id)}
      className="button-fab"
      type="button"
    >
      <FaTimes />
    </button>
  </div>
);

Choice.propTypes = {
  handleDeleteChoice: PropTypes.func.isRequired,
  handleUpdateChoice: PropTypes.func.isRequired,
  choice: PropTypes.object.isRequired
};

export default Choice;
