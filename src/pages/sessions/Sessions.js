import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "app/Theme";
// import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Main from "layout/Main";

const sessions = [
  { name: "Session1", id: "123" },
  { name: "Session2", id: "1234" },
  { name: "Session3", id: "12345" }
];

const Sessions = () => {
  const classes = useStyles();
  return (
    // <Container component="main" maxWidth="md">
    //   <div className={classes.paper}>
    <Main>
      <Typography component="h1" variant="h5">
        My Sessions
      </Typography>
      {sessions.map(session => (
        <Card key={session.id} className={classes.paperCard}>
          <Typography component="h2" variant="h6">
            {session.name || "unnamed session"}
          </Typography>
          <Link to={`/sessions/${session.id}`} component={RouterLink}>
            Go To Session
          </Link>
        </Card>
      ))}
      <Link to={`/sessions/create`} component={RouterLink}>
        Create New Session
      </Link>
    </Main>
    //   </div>
    // </Container>
  );
};
export default Sessions;
