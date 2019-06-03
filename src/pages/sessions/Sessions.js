import React from "react";
import { useStyles } from "app/Theme";
import Main from "layout/Main";
import PlaceholderImage from "images/placeholder.png";
import Section from "layout/Section";
import { useSessions } from "hooks/useSessions";
import { ShareIcon, MoreVertIcon } from "layout/material-ui/icons";
import {
  Link,
  RouterLink,
  CircularProgress,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Avatar,
  Typography
} from "layout/material-ui/core";

const Sessions = () => {
  const classes = useStyles();
  const [sessions] = useSessions();
  if (!sessions.length)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  return (
    <Main>
      <Section flex="column center">
        <Typography component="h1" variant="h6">
          My Sessions
        </Typography>
      </Section>
      <Section flex="column space-between">
        <Section flex="row space-between">
          <Button variant="text">
            <Link to={`/`} component={RouterLink}>
              Home
            </Link>
          </Button>
          <Button variant="text">
            <Link to={`/sessions/create`} component={RouterLink}>
              Create New Session
            </Link>
          </Button>
        </Section>
        {sessions.map(session => (
          <Card key={session.id} className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Session" className={classes.avatar}>
                  S
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={session.name}
              subheader="September 14, 2016"
            />
            <RouterLink to={`/sessions/${session.id}`}>
              <CardMedia
                className={classes.media}
                image={session.image || PlaceholderImage}
                title="Placeholder"
              />
            </RouterLink>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                <Link to={`/sessions/${session.id}`} component={RouterLink}>
                  Go To Session
                </Link>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Section>
    </Main>
  );
};
export default Sessions;
