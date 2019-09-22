import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import useSession from 'hooks/useSession';
import Main from 'layout/Main';
import { CircularProgress } from 'layout/material-ui/core';
import { toast } from 'react-toastify';
import { FaRegPlusSquare } from 'react-icons/fa';
import Question from './components/Question';
import createQuestionGql from './gql/createQuestion.gql';
import deleteQuestionGql from './gql/deleteQuestion.gql';
import updateQuestionGql from './gql/updateQuestion.gql';
import styles from './Edit.module.scss';

const Edit = ({ match }) => {
  const {
    publicId,
    questions: queryQuestions,
    error,
    loading,
    refetchSession
  } = useSession(match.params.sessionId);

  const [questions, setQuestions] = useState([]);

  const [createQuestionMutation] = useMutation(createQuestionGql);
  const [deleteQuestionMutation] = useMutation(deleteQuestionGql);
  const [updateQuestionMutation] = useMutation(updateQuestionGql);

  useEffect(() => {
    setQuestions(queryQuestions);
  }, [queryQuestions]);

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

  const handleDeleteQuestion = questionId => {
    deleteQuestionMutation({
      variables: {
        questionId
      },
      update: () => {
        toast.success('Question created successfully..');
        refetchSession();
      }
    });
  };

  const handleUpdateQuestion = (questionId, question) => {
    updateQuestionMutation({
      variables: {
        questionId,
        question
      },
      update: () => {
        toast.success('Question updated successfully..');
        refetchSession();
      }
    });
  };

  const handleCreateQuestion = () => {
    createQuestionMutation({
      variables: {
        publicId,
        question: {
          body: '',
          imageUrls: [],
          choices: [{ body: '', correct: false }]
        }
      },
      update: () => {
        toast.success('Question created successfully..');
        refetchSession();
      }
    });
  };

  return (
    <Main>
      <div className="container">
        <h1 className="h1">Edit Session</h1>
        <div>
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleCreateQuestion}
          >
            <FaRegPlusSquare /> Create new question
          </button>
          {questions.map(question => (
            <Question
              key={question.id}
              question={question}
              handleUpdateQuestion={handleUpdateQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
              refetchSession={refetchSession}
            />
          ))}
        </div>
      </div>
    </Main>
  );
};

Edit.propTypes = {
  match: PropTypes.object.isRequired
};

export default Edit;
