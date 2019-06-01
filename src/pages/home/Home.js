import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "app/Theme";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const Home = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Link to="/sessions" component={RouterLink}>
          My Sessions
        </Link>
        <Link to="/join" component={RouterLink}>
          Join Session
        </Link>
      </div>
    </Container>
  );
};
export default Home;
