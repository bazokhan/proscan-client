import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import useSession from 'hooks/useSession';
import Main from 'layout/Main';
import { CircularProgress } from 'layout/material-ui/core';
import { toast } from 'react-toastify';
import {
  FaTrashAlt,
  FaCheck,
  FaPlus,
  FaTimes,
  FaRegPlusSquare
} from 'react-icons/fa';
import uuid from 'uuid/v4';
// import SessionForm from './components/SessionForm';
// import createQuestionsGql from './gql/createQuestions.gql';
import createQuestionGql from './gql/createQuestion.gql';
import deleteQuestionGql from './gql/deleteQuestion.gql';
import updateQuestionGql from './gql/updateQuestion.gql';
import DropZone from './components/DropZone';

const Choice = ({ choice, handleDeleteChoice, handleUpdateChoice }) => (
  <div>
    <input
      type="checkbox"
      checked={choice.correct}
      onChange={() => handleUpdateChoice(choice.body, !choice.correct)}
    />

    <input
      type="text"
      className="input"
      placeholder="Enter choice text"
      name={`bodyof${choice.id}`}
      onChange={e => handleUpdateChoice(e.target.value, choice.correct)}
      value={choice.body}
    />
    <div className={`toast-${choice.correct ? 'success' : 'error'}`}>
      This choice is {choice.correct ? 'Correct' : 'Wrong'}
    </div>

    <button
      onClick={() => handleDeleteChoice(choice.id)}
      className="button-fab"
      type="button"
    >
      <FaTimes />
    </button>
  </div>
);

Choice.propTypes = {
  handleDeleteChoice: PropTypes.func.isRequired,
  handleUpdateChoice: PropTypes.func.isRequired,
  choice: PropTypes.object.isRequired
};

const Question = ({ question, handleDeleteQuestion, handleUpdateQuestion }) => {
  const [body, setBody] = useState(question.body);
  const [imageUrls, setImageUrls] = useState(question.imageUrls);
  const [choices, setChoices] = useState(question.choices);
  const [hasImages, setHasImages] = useState(question.imageUrls.length > 0);

  const handleCreateChoice = () => {
    setChoices([
      ...choices,
      { id: uuid().slice(0, 10), body: '', correct: false }
    ]);
  };

  const handleDeleteChoice = choiceId => {
    setChoices(choices.filter(choice => choice.id !== choiceId));
  };

  const updateChoice = (id, choiceBody, correct) => {
    setChoices(
      choices.map(choice => {
        if (choice.id === id) {
          return { id: choice.id, body: choiceBody, correct };
        }
        return choice;
      })
    );
  };

  return (
    <div>
      <button
        type="button"
        className="button-fab"
        onClick={() => handleDeleteQuestion(question.id)}
      >
        <FaTrashAlt />
      </button>

      <label htmlFor="hasImages">
        <input
          type="checkbox"
          name="hasImages"
          checked={hasImages}
          onChange={() => setHasImages(!hasImages)}
        />
        <span>This Question Has {hasImages ? '' : 'No'} Images.</span>
      </label>
      {hasImages && (
        <DropZone
          // handleSubmit={images => handleUploadImages(question, images)}
          images={imageUrls}
        />
      )}

      <textarea
        type="text"
        className="textarea"
        placeholder="Enter question text"
        name={`bodyof${question.id}`}
        onChange={e => setBody(e.target.value)}
        value={body}
      />

      <button type="button" className="button-fab" onClick={handleCreateChoice}>
        <FaPlus />
      </button>
      {choices.map(choice => {
        return (
          <Choice
            key={choice.id}
            choice={choice}
            handleDeleteChoice={handleDeleteChoice}
            handleUpdateChoice={(choiceBody, correct) =>
              updateChoice(choice.id, choiceBody, correct)
            }
          />
        );
      })}
      <button
        type="button"
        className="button-fab"
        onClick={() =>
          handleUpdateQuestion(question.id, {
            body,
            imageUrls,
            choices: choices.map(({ id, body: choiceBody, correct }) => ({
              id,
              body: choiceBody,
              correct
            }))
          })
        }
      >
        <FaCheck />
      </button>
    </div>
  );
};

Question.propTypes = {
  handleDeleteQuestion: PropTypes.func.isRequired,
  handleUpdateQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

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
  // const [mutationQuestions, setMutationQuestions] = useState([]);
  // const [createQuestionsMutation] = useMutation(createQuestionsGql);

  const [createQuestionMutation] = useMutation(createQuestionGql);
  const [deleteQuestionMutation] = useMutation(deleteQuestionGql);
  const [updateQuestionMutation] = useMutation(updateQuestionGql);

  useEffect(() => {
    setQuestions(queryQuestions);
  }, [queryQuestions]);

  // useEffect(() => {
  //   const filteredQuestions = questions.map(
  //     ({ body, imageUrls, choices, id }) => {
  //       const q = {
  //         body,
  //         imageUrls,
  //         choices: choices.map(
  //           ({ id: choiceId, body: choiceBody, correct }) => {
  //             const c = {
  //               body: choiceBody,
  //               correct
  //             };
  //             if (typeof choiceId !== 'number') {
  //               c.id = choiceId;
  //             }
  //             return c;
  //           }
  //         )
  //       };
  //       if (typeof id !== 'number') {
  //         q.id = id;
  //       }
  //       return q;
  //     }
  //   );
  //   // setMutationQuestions(filteredQuestions);
  // }, [questions]);

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

  // const handleCreateQuestions = async () => {
  //   try {
  //     setIsUpdating(true);
  //     await createQuestionsMutation({
  //       variables: {
  //         publicId,
  //         data: mutationQuestions
  //       },
  //       optimisticResponse: ({
  //         publicId: sessionId,
  //         data: updatedQuestions
  //       }) => {
  //         toast.info(`Updating your session: ${sessionId}`);
  //         console.log(updatedQuestions);
  //       },
  //       update: (cache, res) => {
  //         console.log({ cache, res });
  //         toast.success('Questions saved successfully..');
  //         setIsUpdating(false);
  //         refetchSession();
  //         history.push(`/sessions/${publicId}`);
  //       }
  //     });
  //     setIsUpdating(false);
  //   } catch (err) {
  //     toast.error(err.message.replace('GraphQL error: ', ''));
  //     setEditError(err);
  //     setIsUpdating(false);
  //   }
  // };

  const handleDeleteQuestion = questionId => {
    deleteQuestionMutation({
      variables: {
        questionId
      },
      update: (_, { data: { deleteQuestion } }) => {
        console.log({ deleteQuestion });
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
      update: (_, { data: { updateQuestion } }) => {
        console.log({ updateQuestion });
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
      update: (_, { data: { createQuestion } }) => {
        console.log({ createQuestion });
        toast.success('Question created successfully..');
        refetchSession();
      }
    });
  };

  return (
    <Main>
      <div className="container">
        {editError && <div className="toast-error">{editError.message}</div>}
        <h1 className="h1">Edit Session</h1>
        {isUpdating ? (
          <CircularProgress />
        ) : (
          // <SessionForm
          //   questions={questions}
          //   setQuestions={setQuestions}
          //   createQuestionsMutation={handleCreateQuestions}
          // />
          <div>
            <button
              type="button"
              className="button-fab"
              onClick={handleCreateQuestion}
            >
              <FaRegPlusSquare />
            </button>
            {questions.map(question => (
              <Question
                key={question.id}
                question={question}
                handleUpdateQuestion={handleUpdateQuestion}
                handleDeleteQuestion={handleDeleteQuestion}
              />
            ))}
          </div>
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
