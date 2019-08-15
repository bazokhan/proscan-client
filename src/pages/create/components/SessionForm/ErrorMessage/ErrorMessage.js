import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  errorContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    backgroundColor: '#ffbfbf'
  }
}));

const ErrorMessage = ({ error }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.errorContainer} elevation={0}>
      <Typography variant="subtitle1" color="error">
        {error.message}
      </Typography>
    </Paper>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired
};

export default ErrorMessage;
