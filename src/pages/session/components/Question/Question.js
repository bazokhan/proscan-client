import React from 'react';
import PropTypes from 'prop-types';
import ImagePreviews from 'layout/ImagePreviews';

const Question = ({ question, children }) => {
  console.log({ question });
  return (
    <>
      <div className="toast">
        <h3 className="h3">{question.body}</h3>
        {question.images && <ImagePreviews images={question.images} />}
      </div>
      {children}
    </>
  );
};

Question.propTypes = {
  children: PropTypes.node,
  question: PropTypes.object.isRequired
};

Question.defaultProps = {
  children: null
};

export default Question;
