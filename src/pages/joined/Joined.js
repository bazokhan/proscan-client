import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Question from 'components/Question';
import Main from 'layout/Main';
import {
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography
} from 'layout/material-ui/core';
import RouteButton from 'layout/RouteButton';
import Section from 'layout/Section';
import useSession from 'hooks/useSession';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import useStyles from 'app/Theme';

const Joined = ({ match, index }) => {
  const classes = useStyles();
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(index);
  const [answers, setAnswers] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [session] = useSession(match.params.sessionId);

  const handleChoiceChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  useEffect(() => {
    setTimeout(() => {
      setQuestionIndex(q => q + 1);
    }, 7000);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [questionIndex]);

  useEffect(() => {
    if (session) {
      setQuestion(session.questions[questionIndex]);
    }
  }, [session, questionIndex]);

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
    <Main>
      <Section flex="column center">
        <Typography component="h1" variant="h6">
          {session.name}
        </Typography>
      </Section>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Question
          label={`Question ${questionIndex + 1} : `}
          key={question.id}
          question={question}
        >
          <Card className={classes.form}>
            <CardContent>
              <FormControl component="fieldset">
                <CardHeader
                  title={
                    <FormLabel component="legend">Pick Only One</FormLabel>
                  }
                  avatar={<Avatar>1</Avatar>}
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
      )}
      {Object.keys(answers).map(key => (
        <React.Fragment key={key}>
          <div>Question: {key}</div>
          <div>Choice: {answers[key]}</div>
        </React.Fragment>
      ))}
      <RouteButton to="/join">Exit This Session</RouteButton>
    </Main>
  );
};

Joined.propTypes = {
  match: PropTypes.object.isRequired,
  index: PropTypes.number
};

Joined.defaultProps = {
  index: 0
};

export default Joined;
