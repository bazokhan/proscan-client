const validate = questions => {
  const errors = [];
  // if (!session.publicId) {
  //   errors.push({
  //     field: 'Session PublicId',
  //     message: 'A Session Must Have A Valid PublicId'
  //   });
  // }
  if (!questions.length) {
    errors.push({
      field: 'Session Questions',
      message: 'A Session Must Have At Least One Question'
    });
  }
  if (!questions.every(question => question.body)) {
    errors.push({
      field: 'Question Body',
      message: 'A Question Must Have A Valid Body'
    });
  }
  if (
    !questions.every(question => question.choices && question.choices.length)
  ) {
    errors.push({
      field: 'Question Choices',
      message: 'A Question Must Have At Least One Choice'
    });
  }
  if (
    !questions.every(
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
