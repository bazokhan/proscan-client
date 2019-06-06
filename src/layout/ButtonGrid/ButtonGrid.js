import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import useStyles from 'app/Theme';

const ButtonGrid = ({ children, withMargin }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {React.Children.map(children, child => {
        if (!child) return null;
        const clonedChild = withMargin
          ? React.cloneElement(child, {
              fullWidth: true,
              className: classes.buttonGrid
            })
          : React.cloneElement(child, {
              fullWidth: true
            });
        return (
          <Grid item xs={child.props.gridwidth || 12}>
            {clonedChild}
          </Grid>
        );
      })}
    </Grid>
  );
};

ButtonGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  withMargin: PropTypes.bool
};

ButtonGrid.defaultProps = {
  withMargin: false
};

export default ButtonGrid;
