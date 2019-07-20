import React, { useContext, useEffect } from 'react';
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
import Section from 'layout/Section';
import useStyles from 'app/Theme';
import SessionContext from 'context/SessionContext';

const Details = () => {
  const classes = useStyles();
  const { session, setEditMode } = useContext(SessionContext);

  useEffect(() => {
    setEditMode(false);
  }, [setEditMode]);

  if (!session)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    <Main>
      <Section>
        <Typography component="h1" variant="h6">
          {session.name}
        </Typography>
      </Section>
      <Section>
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
        <Section key={question.id} className={classes.form}>
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
        </Section>
      ))}
      <Section>
        <Button variant="text">
          <Link to="/sessions/" component={RouterLink}>
            Back To My Sessions
          </Link>
        </Button>
      </Section>
    </Main>
  );
};

export default Details;
