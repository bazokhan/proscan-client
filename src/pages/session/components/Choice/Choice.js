import React from 'react';
import PropTypes from 'prop-types';

const Choice = ({ choice, children }) => {
  console.log({ choice });
  return (
    <div className={`toast-${choice.correct ? 'success' : 'error'}`}>
      <p className="p">{choice.body}</p>
      {children}
    </div>
  );
};

Choice.propTypes = {
  children: PropTypes.node,
  choice: PropTypes.object.isRequired
};

Choice.defaultProps = {
  children: null
};

export default Choice;
