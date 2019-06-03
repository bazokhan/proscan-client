import React from "react";
import Grid from "@material-ui/core/Grid";

const ButtonGrid = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {React.Children.map(children, child => {
        if (!child) return;
        const clonedChild = React.cloneElement(child, {
          fullWidth: true
        });
        console.log({ child, clonedChild });
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
