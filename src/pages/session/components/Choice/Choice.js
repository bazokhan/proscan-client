import React from 'react';
import PropTypes from 'prop-types';

const Choice = ({ choice, children }) => (
  <>
    {choice.body}
    {children}
  </>
);

Choice.propTypes = {
  children: PropTypes.node,
  choice: PropTypes.object.isRequired
};

Choice.defaultProps = {
  children: null
};

export default Choice;
