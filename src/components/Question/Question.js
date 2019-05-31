import React from "react";
import PropTypes from "prop-types";

const Question = ({
  label,
  question,
  editMode,
  children,
  handleLabelChange,
  handleBodyChange
}) => (
  <div>
    <div>Label: {label}</div>
    {editMode && (
      <input
        type="text"
        name={`labelof${question.id}`}
        onChange={e => handleLabelChange(e.target.value)}
        value={label}
      />
    )}
    <div>Body: {question.body}</div>
    {editMode && (
      <input
        type="text"
        name={`bodyof${question.id}`}
        onChange={e => handleBodyChange(e.target.value)}
        value={question.body}
      />
    )}
    {children}
  </div>
);
Question.propTypes = {
  label: PropTypes.string,
  question: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  handleLabelChange: PropTypes.func,
  handleBodyChange: PropTypes.func
};

Question.defaultProps = {
  label: "*",
  editMode: false,
  handleLabelChange: () =>
    console.log(
      "You Have Not Set A handleLabelChange Function For The Question Inputs"
    ),
  handleBodyChange: () =>
    console.log(
      "You Have Not Set A handleBodyChange Function For The Question Inputs"
    )
};

export default Question;
