import { useState, useEffect } from "react";
import fakeData from "helpers/fakeData";
import validate from "helpers/validate";

const useEditableSession = id => {
  const [session, setSession] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!id) {
      setSession({ name: "", questions: [] });
      return;
    }
    setTimeout(() => {
      setSession({ name: "Session1", id: "123", questions: fakeData });
    }, 700);
  }, [id]);

  const toggleEditMode = e => {
    setErrors(validate(session));
    setEditMode(!editMode);
  };

  const handleQuestionBodyChange = (newBody, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = { ...question, body: newBody };
    setSession({
      ...session,
      questions: session.questions.map((question, index) => {
        return index === questionIndex ? newQuestion : question;
      })
    });
  };

  const handleUploadImages = (images, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = { ...question, images };
    setSession({
      ...session,
      questions: session.questions.map((question, index) => {
        return index === questionIndex ? newQuestion : question;
      })
    });
  };

  const handleQuestionLabelChange = (newLabel, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = { ...question, label: newLabel };
    setSession({
      ...session,
      questions: session.questions.map((question, index) => {
        return index === questionIndex ? newQuestion : question;
      })
    });
  };

  const handleChoiceBodyChange = (newBody, choiceIndex, questionIndex) => {
    const question = session.questions[questionIndex];
    const choice = question.choices[choiceIndex];
    const newChoice = { ...choice, body: newBody };
    const newQuestion = {
      ...question,
      choices: question.choices.map((choice, i) => {
        return i === choiceIndex ? newChoice : choice;
      })
    };
    setSession({
      ...session,
      questions: session.questions.map((question, i) => {
        return i === questionIndex ? newQuestion : question;
      })
    });
  };

  const handleAddNewQuestion = e => {
    e.preventDefault();
    setSession({
      ...session,
      questions: [
        ...session.questions,
        { id: `q${Math.random()}`, body: "", choices: [] }
      ]
    });
  };

  const handleAddNewChoice = questionIndex => {
    setSession({
      ...session,
      questions: session.questions.map((question, i) => {
        return i === questionIndex
          ? {
              ...question,
              choices: [
                ...question.choices,
                { id: `c${Math.random()}`, body: "" }
              ]
            }
          : question;
      })
    });
  };

  const handleDeleteChoice = (choiceIndex, questionIndex) => {
    const question = session.questions[questionIndex];
    const newQuestion = {
      ...question,
      choices: question.choices.filter((choice, i) => {
        return i !== choiceIndex;
      })
    };
    setSession({
      ...session,
      questions: session.questions.map((question, i) => {
        return i === questionIndex ? newQuestion : question;
      })
    });
  };

  return [
    session,
    setSession,
    editMode,
    toggleEditMode,
    errors,
    {
      handleQuestionBodyChange,
      handleQuestionLabelChange,
      handleChoiceBodyChange,
      handleAddNewQuestion,
      handleAddNewChoice,
      handleDeleteChoice,
      handleUploadImages
    }
  ];
};

export { useEditableSession };
