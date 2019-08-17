import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AddIcon, CloudDoneIcon } from 'layout/material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import validate from 'helpers/validate';
import Choice from '../Choice';
import Question from '../Question';

const includes = (arr, obj) => arr.find(o => obj.id === o.id);
const isEqual = (obj1, obj2) => obj1.id === obj2.id;

const createChoice = (question, newChoice) => ({
  ...question,
  choices: [...question.choices, newChoice]
});

const createQuestion = (session, newQuestion) => ({
  ...session,
  questions: [...session.questions, newQuestion]
});

const updateQuestion = (session, ...newQuestions) => {
  const questions = session.questions.map(originalQuestion => {
    const updatedQuestion = includes(newQuestions, originalQuestion);
    if (updatedQuestion) {
      return updatedQuestion;
    }
    return originalQuestion;
  });
  return {
    ...session,
    questions
  };
};

const updateChoice = (question, ...newChoices) => {
  const choices = question.choices.map(originalChoice => {
    const updatedChoice = includes(newChoices, originalChoice);
    if (updateChoice) {
      return updatedChoice;
    }
    return originalChoice;
  });
  return {
    ...question,
    choices
  };
};

const deleteQuestion = (session, targetQuestion) => {
  const questions = session.questions.filter(
    originalQuestion => !isEqual(originalQuestion, targetQuestion)
  );
  return {
    ...session,
    questions
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

const findQuestionByChoice = (session, choice) =>
  session.questions.find(
    q => q.choices && q.choices.find(c => isEqual(c, choice))
  );

export { isEqual, createChoice, updateQuestion, findQuestionByChoice };

const SessionForm = ({ session }) => {
  const [editedSession, setEditedSession] = useState(session);
  const [errors, setErrors] = useState([]);

  // Question Handlers
  const handleAddNewQuestion = () => {
    setEditedSession(
      createQuestion(editedSession, {
        id: Math.random(),
        body: '',
        choices: []
      })
    );
  };

  const handleQuestionBodyChange = (question, body) => {
    const newQuestion = { ...question, body };
    setEditedSession(updateQuestion(editedSession, newQuestion));
  };

  const handleUploadImages = (question, images) => {
    const newQuestion = { ...question, images };
    setEditedSession(updateQuestion(editedSession, newQuestion));
  };

  const handleDeleteQuestion = question =>
    setEditedSession(deleteQuestion(editedSession, question));

  // Choice handlers
  const handleAddNewChoice = targetQuestion => {
    const newQuestion = createChoice(targetQuestion, {
      id: Math.random(),
      body: '',
      correct: false
    });
    setEditedSession(updateQuestion(editedSession, newQuestion));
  };

  const handleChoiceBodyChange = (choice, body) => {
    const question = findQuestionByChoice(editedSession, choice);
    console.log({ question });
    const newChoice = { ...choice, body };
    const newQuestion = updateChoice(question, newChoice);
    setEditedSession(updateQuestion(editedSession, newQuestion));
  };

  const handleChoiceCorrectToggle = choice => {
    const question = findQuestionByChoice(editedSession, choice);
    console.log({ question });
    const newChoice = { ...choice, correct: !choice.correct };
    const newQuestion = updateChoice(question, newChoice);
    setEditedSession(updateQuestion(editedSession, newQuestion));
  };

  const handleDeleteChoice = choice => {
    const question = findQuestionByChoice(editedSession, choice);
    console.log({ question });
    const newQuestion = deleteChoice(question, choice);
    setEditedSession(updateQuestion(editedSession, newQuestion));
  };

  if (!editedSession) return <CircularProgress />;

  return (
    <form
      className="form"
      onSubmit={e => {
        e.preventDefault();
        setErrors(validate(editedSession));
        console.log({ errors, questions: editedSession.questions });
      }}
    >
      <button type="button" className="button" onClick={handleAddNewQuestion}>
        <AddIcon />
        Add New Question
      </button>

      {editedSession.questions &&
        editedSession.questions.map(question => (
          <div key={question.id} className="card">
            <Question
              question={question}
              handleQuestionBodyChange={handleQuestionBodyChange}
              handleUploadImages={handleUploadImages}
              handleDeleteQuestion={handleDeleteQuestion}
            >
              {question.choices &&
                question.choices.map(choice => (
                  <div className="toast" key={choice.id}>
                    <Choice
                      choice={choice}
                      handleChoiceBodyChange={handleChoiceBodyChange}
                      handleDeleteChoice={handleDeleteChoice}
                      handleChoiceCorrectToggle={handleChoiceCorrectToggle}
                    />
                  </div>
                ))}
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

      <button type="submit" className="button" disabled={errors.length > 0}>
        Save Session
        <CloudDoneIcon />
      </button>
    </form>
  );
};

SessionForm.propTypes = {
  session: PropTypes.object.isRequired
};

export default SessionForm;
