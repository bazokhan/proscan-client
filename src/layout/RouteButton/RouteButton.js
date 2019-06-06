import React from 'react';
import PropTypes from 'prop-types';
import { Link, RouterLink, Button } from 'layout/material-ui/core';

const RouteButton = ({ to, children, ...props }) => (
  <Link to={to} component={RouterLink}>
    <Button {...props}>{children}</Button>
  </Link>
);

RouteButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  to: PropTypes.string.isRequired
};

export default RouteButton;
