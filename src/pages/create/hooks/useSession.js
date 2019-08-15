import { useState, useEffect } from 'react';
import validate from 'helpers/validate';

const useSession = () => {
  const [session, setSession] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setSession({
      publicId: '',
      questions: []
    });
  }, []);

  const toggleEditMode = () => {
    setErrors(validate(session));
    setEditMode(!editMode);
  };

  const handlePublicIdChange = newId => {
    setSession({ ...session, publicId: newId });
  };

  const handleQuestionBodyChange = (questionId, newBody) => {
    const question = session.questions.find(q => q.id === questionId);
    const newQuestion = { ...question, body: newBody };
    setSession({
      ...session,
      questions: session.questions.map(q =>
        q.id === questionId ? newQuestion : q
      )
    });
  };

  const handleUploadImages = (questionId, images) => {
    const question = session.questions.find(q => q.id === questionId);
    const newQuestion = { ...question, images };
    setSession({
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
    setSession({
      ...session,
      questions: session.questions.map(q =>
        q.id === newQuestion.id ? newQuestion : q
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

  const handleDeleteChoice = choiceId => {
    const question = session.questions.find(
      q =>
        q.choices && q.choices.length && q.choices.find(c => c.id === choiceId)
    );
    const newQuestion = {
      ...question,
      choices: question.choices.filter(c => c.id !== choiceId)
    };
    setSession({
      ...session,
      questions: session.questions.map(q =>
        q.id === newQuestion.id ? newQuestion : q
      )
    });
  };

  return {
    session,
    setSession,
    editMode,
    toggleEditMode,
    errors,
    handlePublicIdChange,
    handleQuestionBodyChange,
    handleChoiceBodyChange,
    handleAddNewQuestion,
    handleAddNewChoice,
    handleDeleteChoice,
    handleUploadImages
  };
};

export default useSession;
