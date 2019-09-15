import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useMutation } from 'react-apollo';
import AddIcon from '@material-ui/icons/Add';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CircularProgress from '@material-ui/core/CircularProgress';
import validate from './validate';
import Choice from '../Choice';
import Question from '../Question';
import Modal from '../Modal';
// import createQuestionsGql from '../../gql/createQuestions.gql';

const includes = (arr, obj) => arr.find(o => obj.id === o.id);
const isEqual = (obj1, obj2) => obj1.id === obj2.id;

const createQuestion = (questions, newQuestion) => [...questions, newQuestion];

const updateQuestion = (questions, ...newQuestions) =>
  questions.map(originalQuestion => {
    const updatedQuestion = includes(newQuestions, originalQuestion);
    if (updatedQuestion) {
      return updatedQuestion;
    }
    return originalQuestion;
  });

const deleteQuestion = (questions, targetQuestion) =>
  questions.filter(
    originalQuestion => !isEqual(originalQuestion, targetQuestion)
  );

const createChoice = (question, newChoice) => ({
  ...question,
  choices: [...question.choices, newChoice]
});

const updateChoice = (question, ...newChoices) => {
  const choices = question.choices.map(originalChoice => {
    const updatedChoice = includes(newChoices, originalChoice);
    if (updatedChoice) {
      return updatedChoice;
    }
    return originalChoice;
  });
  return {
    ...question,
    choices
  };
};

const deleteChoice = (question, targetChoice) => {
  const choices = question.choices.filter(
    originalChoice => !isEqual(originalChoice, targetChoice)
  );
  return {
    ...question,
    choices
  };
};

const questionByChoice = (questions, choice) => {
  const question = questions.find(
    q => q.choices && q.choices.find(c => isEqual(c, choice))
  );
  return question;
};

export { isEqual, createChoice, updateQuestion, questionByChoice };

const SessionForm = ({ questions, setQuestions, createQuestionsMutation }) => {
  const [errors, setErrors] = useState([]);
  const [saved, setSaved] = useState(false);

  // Question Handlers
  const handleAddNewQuestion = () => {
    setQuestions(
      createQuestion(questions, {
        id: Math.random(),
        body: '',
        choices: [],
        imageUrls: []
      })
    );
  };

  const handleQuestionBodyChange = (question, body) => {
    const newQuestion = { ...question, body };
    setQuestions(updateQuestion(questions, newQuestion));
  };

  const handleUploadImages = (question, images) => {
    const newQuestion = { ...question, images };
    setQuestions(updateQuestion(questions, newQuestion));
  };

  const handleDeleteQuestion = question =>
    setQuestions(deleteQuestion(questions, question));

  // Choice handlers
  const handleAddNewChoice = targetQuestion => {
    const newQuestion = createChoice(targetQuestion, {
      id: Math.random(),
      body: '',
      correct: false
    });
    setQuestions(updateQuestion(questions, newQuestion));
  };

  const handleChoiceBodyChange = (choice, body) => {
    const question = questionByChoice(questions, choice);
    const newChoice = { ...choice, body };
    const newQuestion = updateChoice(question, newChoice);
    setQuestions(updateQuestion(questions, newQuestion));
  };

  const handleChoiceCorrectToggle = choice => {
    const question = questionByChoice(questions, choice);
    const newChoice = { ...choice, correct: !choice.correct };
    const newQuestion = updateChoice(question, newChoice);
    setQuestions(updateQuestion(questions, newQuestion));
  };

  const handleDeleteChoice = choice => {
    const question = questionByChoice(questions, choice);
    const newQuestion = deleteChoice(question, choice);
    setQuestions(updateQuestion(questions, newQuestion));
  };

  // Form handlers
  const handleSubmit = e => {
    e.preventDefault();
    const formErrors = validate(questions);
    if (formErrors.length) {
      setErrors(formErrors);
      return;
    }
    setSaved(true);
  };

  if (!questions) return <CircularProgress />;
  // console.log({ session });

  return (
    <>
      {!errors.length && !saved && (
        <form className="form" onSubmit={handleSubmit}>
          <button
            type="button"
            className="button"
            onClick={handleAddNewQuestion}
          >
            <AddIcon />
            Add New Question
          </button>

          {questions &&
            questions.map(question => (
              <div key={question.id} className="card">
                <Question
                  question={question}
                  handleQuestionBodyChange={handleQuestionBodyChange}
                  handleUploadImages={handleUploadImages}
                  handleDeleteQuestion={handleDeleteQuestion}
                >
                  {question.choices &&
                    question.choices.map(
                      choice =>
                        choice && (
                          <div className="toast" key={choice.id}>
                            <Choice
                              choice={choice}
                              handleChoiceBodyChange={handleChoiceBodyChange}
                              handleDeleteChoice={handleDeleteChoice}
                              handleChoiceCorrectToggle={
                                handleChoiceCorrectToggle
                              }
                            />
                          </div>
                        )
                    )}
                  <button
                    onClick={() => handleAddNewChoice(question)}
                    type="button"
                    className="button"
                  >
                    <AddIcon />
                    Add New Choice
                  </button>
                </Question>
              </div>
            ))}

          <button
            type="submit"
            className="button"
            disabled={errors.length || saved}
          >
            Save Session
            <CloudDoneIcon />
          </button>
        </form>
      )}

      {errors.length > 0 && (
        <Modal type="error">
          This session can not be saved for the following errors:
          {errors.map(err => (
            <div key={err.field}>
              {err.field}: {err.message}
            </div>
          ))}
          <button
            type="button"
            className="button"
            onClick={() => setErrors([])}
          >
            Confirm
          </button>
        </Modal>
      )}

      {saved && (
        <Modal type="success">
          Are you sure you want to save this session ?
          {errors.map(err => (
            <div key={err.field}>
              {err.field}: {err.message}
            </div>
          ))}
          <button
            type="button"
            className="button"
            onClick={() => {
              createQuestionsMutation();
              setSaved(false);
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setSaved(false)}
          >
            Return
          </button>
        </Modal>
      )}
    </>
  );
};

SessionForm.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
  createQuestionsMutation: PropTypes.func.isRequired
};

export default SessionForm;
