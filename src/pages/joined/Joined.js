import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Main from 'layout/Main';
import {
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button
} from 'layout/material-ui/core';
import RouteButton from 'layout/RouteButton';
import Section from 'layout/Section';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import useStyles from 'app/Theme';
// import SessionContext from 'context/SessionContext';
import Question from '../session/components/Question';
import useSession from './hooks/useSession';

const Joined = ({ match }) => {
  const classes = useStyles();
  const contextValue = useSession(match.params.sessionId);
  const { session } = contextValue;
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleChoiceChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  useEffect(() => {
    if (session) {
      setQuestion(session.questions[session.activeQuestion]);
      setTimeout(() => {
        setLoading(true);
        setQuestion(session.questions[session.activeQuestion + 1]);
      }, 4000);
      setTimeout(() => {
        setLoading(false);
      }, 8000);
    }
  }, [session]);

  useEffect(() => {
    if (session && question) {
      setQuestionIndex(session.questions.findIndex(q => q.id === question.id));
    }
  }, [session, question]);

  if (!session)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  if (!question)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );

  return (
    // <SessionContext.Provider value={contextValue}>
    <Main>
      <Section>
        <Typography component="h1" variant="h6">
          {session.name}
        </Typography>
      </Section>
      {isLoading ? (
        <Section>
          <CircularProgress />
        </Section>
      ) : (
        <Section>
          <Typography color="primary">
            {`Question ${questionIndex + 1} : `}
          </Typography>
          <Question key={question.id} question={question}>
            <Card className={classes.form}>
              <CardContent>
                <FormControl component="fieldset">
                  <CardHeader
                    title={
                      <FormLabel component="legend">Pick Only One</FormLabel>
                    }
                  />
                  <RadioGroup
                    value={answers[question.id] || ''}
                    onChange={e =>
                      handleChoiceChange(question.id, e.target.value)
                    }
                  >
                    {question.choices.map(choice => (
                      <FormControlLabel
                        key={choice.id}
                        value={choice.id}
                        control={<Radio />}
                        label={choice.body}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Question>
        </Section>
      )}
      <Section>
        <Button
          disabled={questionIndex < session.questions.length - 1}
          onClick={() => {
            console.log({ answers });
          }}
        >
          Submit
        </Button>
        <RouteButton to="/join">Exit This Session</RouteButton>
      </Section>
    </Main>
    // </SessionContext.Provider>
  );
};

Joined.propTypes = {
  match: PropTypes.object.isRequired
};

export default Joined;
