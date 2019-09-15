import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import useSession from 'hooks/useSession';
import Main from 'layout/Main';
import { CircularProgress } from 'layout/material-ui/core';
import { toast } from 'react-toastify';
import SessionForm from './components/SessionForm';
import createQuestionsGql from './gql/createQuestions.gql';

const Edit = ({ match, history }) => {
  const {
    publicId,
    questions: queryQuestions,
    error,
    loading,
    refetchSession
  } = useSession(match.params.sessionId);

  const [questions, setQuestions] = useState([]);
  const [editError, setEditError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [mutationQuestions, setMutationQuestions] = useState([]);
  const [createQuestionsMutation] = useMutation(createQuestionsGql);

  useEffect(() => {
    setQuestions(queryQuestions);
  }, [queryQuestions]);

  useEffect(() => {
    const filteredQuestions = questions.map(
      ({ body, imageUrls, choices, id }) => {
        const q = {
          body,
          imageUrls,
          choices: choices.map(
            ({ id: choiceId, body: choiceBody, correct }) => {
              const c = {
                body: choiceBody,
                correct
              };
              if (typeof choiceId !== 'number') {
                c.id = choiceId;
              }
              return c;
            }
          )
        };
        if (typeof id !== 'number') {
          q.id = id;
        }
        return q;
      }
    );
    setMutationQuestions(filteredQuestions);
  }, [questions]);

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

  const handleCreateQuestions = async () => {
    try {
      setIsUpdating(true);
      await createQuestionsMutation({
        variables: {
          publicId,
          data: mutationQuestions
        },
        optimisticResponse: ({
          publicId: sessionId,
          data: updatedQuestions
        }) => {
          toast.info(`Updating your session: ${sessionId}`);
          console.log(updatedQuestions);
        },
        update: (cache, res) => {
          console.log({ cache, res });
          toast.success('Questions saved successfully..');
          setIsUpdating(false);
          refetchSession();
          history.push(`/sessions/${publicId}`);
        }
      });
      setIsUpdating(false);
    } catch (err) {
      toast.error(err.message.replace('GraphQL error: ', ''));
      setEditError(err);
      setIsUpdating(false);
    }
  };

  return (
    <Main>
      <div className="container">
        {editError && <div className="toast-error">{editError.message}</div>}
        <h1 className="h1">Edit Session</h1>
        {isUpdating ? (
          <CircularProgress />
        ) : (
          <SessionForm
            questions={questions}
            setQuestions={setQuestions}
            createQuestionsMutation={handleCreateQuestions}
          />
        )}
      </div>
    </Main>
  );
};

Edit.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Edit;
