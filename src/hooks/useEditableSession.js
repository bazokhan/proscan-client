import { useState, useEffect } from 'react';
import fakeData from 'helpers/fakeData';
import validate from 'helpers/validate';

const useEditableSession = id => {
  const [session, setSession] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!id) {
      setSession({ name: '', questions: [] });
      return;
    }
    setTimeout(() => {
      setSession({ name: 'Session1', id, questions: fakeData });
    }, 700);
  }, [id]);

  const toggleEditMode = () => {
    setErrors(validate(session));
    setEditMode(!editMode);
  };

  const handleQuestionBodyChange = (newBody, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = { ...question, body: newBody };
    setSession({
      ...session,
      questions: session.questions.map((q, index) =>
        index === questionIndex ? newQuestion : q
      )
    });
  };

  const handleUploadImages = (images, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = { ...question, images };
    setSession({
      ...session,
      questions: session.questions.map((q, index) =>
        index === questionIndex ? newQuestion : q
      )
    });
  };

  const handleQuestionLabelChange = (newLabel, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = { ...question, label: newLabel };
    setSession({
      ...session,
      questions: session.questions.map((q, index) =>
        index === questionIndex ? newQuestion : q
      )
    });
  };

  const handleChoiceBodyChange = (newBody, choiceIndex, questionIndex) => {
    const question = session.questions[questionIndex];
    const choice = question.choices[choiceIndex];
    const newChoice = { ...choice, body: newBody };
    const newQuestion = {
      ...question,
      choices: question.choices.map((c, i) =>
        i === choiceIndex ? newChoice : c
      )
    };
    setSession({
      ...session,
      questions: session.questions.map((q, i) =>
        i === questionIndex ? newQuestion : q
      )
    });
  };

  const handleAddNewQuestion = e => {
    e.preventDefault();
    setSession({
      ...session,
      questions: [
        ...session.questions,
        { id: `q${Math.random()}`, body: '', choices: [] }
      ]
    });
  };

  const handleAddNewChoice = questionIndex => {
    setSession({
      ...session,
      questions: session.questions.map((question, i) =>
        i === questionIndex
          ? {
              ...question,
              choices: [
                ...question.choices,
                { id: `c${Math.random()}`, body: '' }
              ]
            }
          : question
      )
    });
  };

  const handleDeleteChoice = (choiceIndex, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = {
      ...question,
      choices: question.choices.filter((choice, i) => i !== choiceIndex)
    };
    setSession({
      ...session,
      questions: session.questions.map((q, i) =>
        i === questionIndex ? newQuestion : q
      )
    });
  };

  return [
    session,
    setSession,
    editMode,
    toggleEditMode,
    errors,
    handleQuestionBodyChange,
    handleQuestionLabelChange,
    handleChoiceBodyChange,
    handleAddNewQuestion,
    handleAddNewChoice,
    handleDeleteChoice,
    handleUploadImages
  ];
};

export default useEditableSession;
