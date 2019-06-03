import React from "react";
import {
  Link,
  RouterLink,
  Avatar,
  Typography,
  Card,
  CardHeader
} from "layout/material-ui/core";
import { SendIcon, CreateIcon } from "layout/material-ui/icons";
import Section from "layout/Section";
import Main from "layout/Main";
import { useStyles } from "app/Theme";

const Home = () => {
  const classes = useStyles();
  return (
    <Main>
      <Section flex="column center">
        <Typography component="h1" variant="h5">
          Welcome Mohamed!
        </Typography>
      </Section>
      <Section flex="column space-between">
        <Link to="/sessions" component={RouterLink} className={classes.form}>
          <Card>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>
                  <CreateIcon />
                </Avatar>
              }
              title="My Sessions"
              subheader="Create, Edit, Preview and Start your sessions"
            />
          </Card>
        </Link>
        <Link to="/join" component={RouterLink} className={classes.form}>
          <Card>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>
                  <SendIcon />
                </Avatar>
              }
              title="Join Session"
              subheader="Join an active session"
            />
          </Card>
        </Link>
      </Section>
    </Main>
  );
};
export default Home;
