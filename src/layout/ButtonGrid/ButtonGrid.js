import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from 'app/Theme';

const ButtonGrid = ({ children, withMargin = false }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {React.Children.map(children, child => {
        if (!child) return;
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

export default ButtonGrid;
