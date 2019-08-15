import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'app/Theme';
import { AddIcon, CloudDoneIcon } from 'layout/material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import validate from 'helpers/validate';
import Choice from '../Choice';
import Question from '../Question';

const SessionForm = ({ session }) => {
  const [editedSession, setEditedSession] = useState(session);
  const [errors, setErrors] = useState([]);
  const classes = useStyles();

  const handleAddNewQuestion = () => {
    setEditedSession({
      ...editedSession,
      questions: [
        ...session.questions,
        { id: Math.random(), body: '', choices: [] }
      ]
    });
  };

  const handleAddNewChoice = questionId => {
    setEditedSession({
      ...editedSession,
      questions: session.questions.map(question =>
        questionId === question.id
          ? {
              ...question,
              choices: [
                ...question.choices,
                { id: Math.random(), body: '', correct: false }
              ]
            }
          : question
      )
    });
  };

  const handleQuestionBodyChange = (questionId, newBody) => {
    const question = session.questions.find(q => q.id === questionId);
    const newQuestion = { ...question, body: newBody };
    setEditedSession({
      ...session,
      questions: session.questions.map(q =>
        q.id === questionId ? newQuestion : q
      )
    });
  };

  const handleUploadImages = (questionId, images) => {
    const question = session.questions.find(q => q.id === questionId);
    const newQuestion = { ...question, images };
    setEditedSession({
      ...session,
      questions: session.questions.map(q =>
        q.id === questionId ? newQuestion : q
      )
    });
  };

  const handleChoiceBodyChange = (choiceId, newBody) => {
    const question = session.questions.find(
      q =>
        q.choices && q.choices.length && q.choices.find(c => c.id === choiceId)
    );
    const choice = question.choices.find(c => c.id === choiceId);
    const newChoice = { ...choice, body: newBody };
    const newQuestion = {
      ...question,
      choices: question.choices.map(c => (c.id === choiceId ? newChoice : c))
    };
    setEditedSession({
      ...session,
      questions: session.questions.map(q =>
        q.id === newQuestion.id ? newQuestion : q
      )
    });
  };

  const handleDeleteChoice = choiceId => {
    const question = session.questions.find(
      q =>
        q.choices && q.choices.length && q.choices.find(c => c.id === choiceId)
    );
    const newQuestion = {
      ...question,
      choices: question.choices.filter(c => c.id !== choiceId)
    };
    setEditedSession({
      ...session,
      questions: session.questions.map(q =>
        q.id === newQuestion.id ? newQuestion : q
      )
    });
  };

  if (!editedSession) return <CircularProgress />;

  return (
    <form
      className="form"
      onSubmit={e => {
        e.preventDefault();
        setErrors(validate(editedSession));
        console.log({ editedSession });
      }}
    >
      <button type="button" className="button" onClick={handleAddNewQuestion}>
        <AddIcon />
        Add New Question
      </button>

      {editedSession.questions.map(question => (
        <div key={question.id} className="card">
          <Question
            question={question}
            handleQuestionBodyChange={handleQuestionBodyChange}
            handleUploadImages={handleUploadImages}
          >
            {question.choices.map(choice => (
              <div className="toast" key={choice.id}>
                <Choice
                  choice={choice}
                  handleChoiceBodyChange={handleChoiceBodyChange}
                  handleDeleteChoice={handleDeleteChoice}
                />
              </div>
            ))}
            <button
              onClick={() => {
                handleAddNewChoice(question.id);
              }}
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
        <CloudDoneIcon className={classes.rightIcon} />
      </button>
    </form>
  );
};

SessionForm.propTypes = {
  session: PropTypes.object.isRequired
};

export default SessionForm;
