import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
  return {
    main: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch"
    }
  };
});

const Main = ({ children }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.main}>{children}</div>
    </Container>
  );
};

export default Main;
