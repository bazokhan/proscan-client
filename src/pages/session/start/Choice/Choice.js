import React from 'react';
import PropTypes from 'prop-types';

const Choice = ({ choice, children }) => (
  <div className="toast">
    <p className="p">{choice.body}</p>
    <div className={`toast-${choice.correct ? 'success' : 'error'}`}>
      Chosen By: {(choice.chosenBy && choice.chosenBy.length) || 0} participants
    </div>
    {children}
  </div>
);

Choice.propTypes = {
  children: PropTypes.node,
  choice: PropTypes.object.isRequired
};

Choice.defaultProps = {
  children: null
};

export default Choice;
