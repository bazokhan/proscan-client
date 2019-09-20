import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Main from 'layout/Main';
import {
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Typography
} from 'layout/material-ui/core';
import RouteButton from 'layout/RouteButton';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import useStyles from 'app/Theme';
import { useSubscription, useQuery, useMutation } from 'react-apollo';
import useGuestSession from 'app/hooks/useGuestSession';
// import useGuestSession from 'app/hooks/useGuestSession';
import Question from '../session/components/Question';
import subToSessionGql from './gql/subToSession.gql';
import activeSessionGql from './gql/activeSession.gql';
import answerQuestionGql from './gql/answerQuestion.gql';

const Joined = ({ match }) => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const { guestId, isLoading } = useGuestSession();

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

  const { data: subData, error: subError } = useSubscription(subToSessionGql, {
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
      if (question) {
        setActiveQuestion(question);
      }
    }
  }, [subData]);

  const [answerQuestionMutation] = useMutation(answerQuestionGql);

  // const {
  //   guestId,
  //   sessionId,
  //   username,
  //   client,
  //   isLoading: guestLoading,
  //   guestLogin,
  //   guestLogout
  // } = useGuestSession();

  // console.log({
  //   guestId,
  //   sessionId,
  //   username,
  //   client,
  //   isLoading: guestLoading,
  //   guestLogin,
  //   guestLogout
  // });

  const handleChoiceChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  if (sessionError || subError)
    return (
      <Main>
        <div className="toast-error">
          Error,{' '}
          {sessionError && sessionError.message.replace('GraphQL error: ', '')}.{' '}
          {subError && subError.message.replace('GraphQL error: ', '')}
        </div>
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
                    {guestId && !isLoading ? (
                      <RadioGroup
                        value={answers[activeQuestion.id] || ''}
                        onChange={e => {
                          handleChoiceChange(activeQuestion.id, e.target.value);
                          answerQuestionMutation({
                            variables: {
                              questionID: activeQuestion.id,
                              chooseID: e.target.value
                            },
                            context: {
                              headers: {
                                guestID: guestId
                              }
                            },
                            update: (_, data) => {
                              console.log(data);
                            }
                          });
                        }}
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
                    ) : (
                      <div>Loading</div>
                    )}
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
