import React from "react";
import { useStyles } from "app/Theme";
import Container from "@material-ui/core/Container";

const Main = ({ children }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.main}>{children}</div>
    </Container>
  );
};

export default Main;
