import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Main from "layout/Main";

const Home = () => {
  return (
    <Main>
      <Link to="/sessions" component={RouterLink}>
        My Sessions
      </Link>
      <Link to="/join" component={RouterLink}>
        Join Session
      </Link>
    </Main>
  );
};
export default Home;
