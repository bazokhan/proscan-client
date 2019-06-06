import React from 'react';
import PropTypes from 'prop-types';
import Choice from 'components/Choice';
import Question from 'components/Question';
import Main from 'layout/Main';
import {
  Link,
  RouterLink,
  CircularProgress,
  Button,
  Typography,
  Card,
  CardContent
} from 'layout/material-ui/core';
import { SendIcon } from 'layout/material-ui/icons';
import useSession from 'hooks/useSession';
import Section from 'layout/Section';
import useStyles from 'app/Theme';

const Details = ({ match }) => {
  const [session] = useSession(match.params.sessionId);
  const classes = useStyles();

  if (!session)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    <Main>
      <Section flex="column center">
        <Typography component="h1" variant="h6">
          {session.name}
        </Typography>
      </Section>
      <Section flex="row space-between">
        <Button variant="text">
          <Link to={`/sessions/${session.id}/edit`} component={RouterLink}>
            Edit
          </Link>
        </Button>
        <Button variant="text">
          <Link to={`/sessions/${session.id}/preview`} component={RouterLink}>
            Preview
          </Link>
        </Button>
        <Button variant="contained">
          <Link
            to={`/sessions/${session.id}/start`}
            component={RouterLink}
            className={classes.rowCenter}
          >
            Start &nbsp; <SendIcon />
          </Link>
        </Button>
      </Section>
      {session.questions.map((question, questionIndex) => (
        <div key={question.id} className={classes.form}>
          <Card className={classes.card}>
            <CardContent>
              <Question
                label={`Question ${questionIndex + 1} : `}
                question={question}
              >
                {question.choices.map((choice, choiceIndex) => (
                  <Choice
                    label={`${choiceIndex + 1} - `}
                    key={choice.id}
                    choice={choice}
                  />
                ))}
              </Question>
            </CardContent>
          </Card>
        </div>
      ))}
      <Section flex="row center">
        <Button variant="text">
          <Link to="/sessions/" component={RouterLink}>
            Back To My Sessions
          </Link>
        </Button>
      </Section>
    </Main>
  );
};

Details.propTypes = {
  match: PropTypes.object.isRequired
};

export default Details;
