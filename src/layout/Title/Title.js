import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Title = ({ title, ...props }) => (
  <Grid item xs={12}>
    <Typography {...props}>{title}</Typography>
  </Grid>
);

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;
