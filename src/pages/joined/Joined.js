import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Main from 'layout/Main';
import {
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Typography
  // Button
} from 'layout/material-ui/core';
import RouteButton from 'layout/RouteButton';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import useStyles from 'app/Theme';
import { useSubscription, useQuery } from 'react-apollo';
// import useRealSession from 'hooks/useSession';
import useGuestSession from 'app/hooks/useGuestSession';
import Question from '../session/components/Question';
// import useSession from './hooks/useSession';
import subToSessionGql from './gql/subToSession.gql';
import activeSessionGql from './gql/activeSession.gql';

const Joined = ({ match }) => {
  const classes = useStyles();
  // const contextValue = useSession(match.params.sessionId);
  // const { session } = contextValue;
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  // const [isLoading, setLoading] = useState(false);
  // const [questionIndex, setQuestionIndex] = useState(0);

  // const { session: initialSession } = useRealSession(match.params.sessionId);

  const {
    data: sessionData,
    loading: sessionLoading,
    error: sessionError
  } = useQuery(activeSessionGql, {
    variables: {
      publicId: match.params.sessionId
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (
      sessionData &&
      sessionData.activeSession &&
      sessionData.activeSession.questions &&
      sessionData.activeSession.activeQuestion
    ) {
      const {
        activeSession: { questions: qs, activeQuestion: aq }
      } = sessionData;
      setQuestions(qs);
      const question = qs.find(({ id }) => aq === id);
      if (question) {
        setActiveQuestion(question);
      }
    }
  }, [sessionData]);

  const {
    data: subData,
    // loading: subLoading,
    error: subError
  } = useSubscription(subToSessionGql, {
    variables: {
      publicId: match.params.sessionId
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (
      subData &&
      subData.subToSession &&
      subData.subToSession.session &&
      subData.subToSession.session.activeQuestion
    ) {
      const {
        subToSession: {
          session: { activeQuestion: aq }
        }
      } = subData;
      const question = questions.find(({ id }) => aq === id);
      console.log(question, questions);
      if (question) {
        console.log('Changing');
        setActiveQuestion(question);
      }
    }
  }, [subData]);

  // useEffect(() => {
  //   console.log(subData);
  //   console.log(activeQuestion);
  // }, [subData, activeQuestion]);

  const {
    guestId,
    sessionId,
    username,
    client,
    isLoading: guestLoading,
    guestLogin,
    guestLogout
  } = useGuestSession();

  console.log({
    guestId,
    sessionId,
    username,
    client,
    isLoading: guestLoading,
    guestLogin,
    guestLogout
  });

  const handleChoiceChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  // useEffect(() => {
  //   if (session && question) {
  //     setQuestionIndex(session.questions.findIndex(q => q.id === question.id));
  //   }
  // }, [session, question]);

  // if (sessionLoading || subLoading)
  //   return (
  //     <Main>
  //       <CircularProgress />
  //     </Main>
  //   );

  if (sessionError || subError)
    return (
      <Main>
        <div>Error!</div>
      </Main>
    );

  return (
    <Main>
      <Typography component="h1" variant="h6">
        Answer The Following:
      </Typography>
      {sessionLoading ? (
        <CircularProgress />
      ) : (
        activeQuestion && (
          <>
            <Typography color="primary">Question Title:</Typography>
            <Question question={activeQuestion}>
              <Card className={classes.form}>
                <CardContent>
                  <FormControl component="fieldset">
                    <CardHeader
                      title={
                        <FormLabel component="legend">Pick Only One</FormLabel>
                      }
                    />
                    <RadioGroup
                      value={answers[activeQuestion.id] || ''}
                      onChange={e =>
                        handleChoiceChange(activeQuestion.id, e.target.value)
                      }
                    >
                      {activeQuestion.choices.map(choice => (
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
          </>
        )
      )}
      {/* <Button
        disabled={questionIndex < questions.length - 1}
        onClick={() => {
          console.log({ answers });
        }}
      >
        Submit
      </Button> */}
      <RouteButton to="/join">Exit This Session</RouteButton>
    </Main>
  );
};

Joined.propTypes = {
  match: PropTypes.object.isRequired
};

export default Joined;
