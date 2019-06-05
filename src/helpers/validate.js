const validate = session => {
  const errors = [];
  if (!session.name) {
    errors.push({
      field: 'Session Name',
      message: 'A Session Must Have A Valid Name'
    });
  }
  if (!session.questions.length) {
    errors.push({
      field: 'Session Questions',
      message: 'A Session Must Have At Least One Question'
    });
  }
  if (!session.questions.every(question => question.body)) {
    errors.push({
      field: 'Question Body',
      message: 'A Question Must Have A Valid Body'
    });
  }
  if (
    !session.questions.every(
      question => question.choices && question.choices.length
    )
  ) {
    errors.push({
      field: 'Question Choices',
      message: 'A Question Must Have At Least One Choice'
    });
  }
  if (
    !session.questions.every(
      question =>
        question.choices && question.choices.every(choice => choice.body)
    )
  ) {
    errors.push({
      field: 'Choice Body',
      message: 'A Choice Must Have A Valid Body'
    });
  }
  return errors;
};

export default validate;
