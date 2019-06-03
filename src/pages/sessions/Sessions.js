import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "app/Theme";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CreateIcon from "@material-ui/icons/Create";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Main from "layout/Main";
import PlaceholderImage from "images/placeholder.png";

import Section from "layout/Section";

const sessions = [
  { name: "Session1", id: "123" },
  { name: "Session2", id: "1234" },
  { name: "Session3", id: "12345" },
  { name: "Session1", id: "1236" },
  { name: "Session2", id: "12347" },
  { name: "Session3", id: "123455" }
];

const Sessions = () => {
  const classes = useStyles();
  return (
    <Main>
      <Section flex="column center">
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          My Sessions
        </Typography>
      </Section>
      <Section flex="row space-around">
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
      <Link to={`/sessions/create`} component={RouterLink}>
        Create New Session
      </Link>
    </Main>
  );
};
export default Sessions;
