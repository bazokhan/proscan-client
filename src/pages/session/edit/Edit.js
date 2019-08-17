import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import Main from 'layout/Main';
import { CircularProgress } from 'layout/material-ui/core';
import SessionForm from './components/SessionForm';
import sessionByIDGql from '../gql/sessionByID.gql';
import createQuestionsGql from './gql/createQuestions.gql';

const Edit = ({ match }) => {
  const { data } = useQuery(sessionByIDGql, {
    variables: { publicId: match.params.sessionId }
  });

  const { sessionByID: session, error, loading } = data;

  const [questions, setQuestions] = useState(session.questions);

  const [createQuestionsMutation] = useMutation(createQuestionsGql, {
    variables: {
      publicId: session.publicId,
      data: questions.map(({ body, imageUrls, choices }) => ({
        body,
        imageUrls,
        choices: choices.map(({ body: choiceBody, correct }) => ({
          body: choiceBody,
          correct
        }))
      }))
    },
    // variables: {
    //   publicId: session.publicId,
    //   data: questions
    // },
    onError: e => {
      console.log('Error!');
      console.log({ e });
    },
    onCompleted: res => {
      console.log('COmpleted!');
      if (res) {
        console.log('Really completed');
        console.log({ res });
      }
    },
    update: (cache, res) => {
      console.log({ cache, res });
    },
    refetchQueries: [sessionByIDGql]
  });

  if (error)
    return (
      <Main>
        <div className="toast-error">Error: {error.message}</div>
      </Main>
    );
  if (loading)
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  if (!session)
    return (
      <Main>
        <div className="toast-error">
          Session Could not be loaded, please try again!
        </div>
      </Main>
    );
  return (
    <Main>
      <div className="container">
        <h1 className="h1">Edit Session</h1>
        <SessionForm
          questions={questions}
          setQuestions={setQuestions}
          createQuestionsMutation={createQuestionsMutation}
        />
      </div>
    </Main>
  );
};

Edit.propTypes = {
  match: PropTypes.object.isRequired
};

export default Edit;
