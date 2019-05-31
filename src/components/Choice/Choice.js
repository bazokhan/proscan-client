import React from "react";
import PropTypes from "prop-types";

const Choice = ({ label, choice, children, editMode, handleBodyChange }) => (
  <div>
    <div>{label}</div>
    <div>{choice.body}</div>
    {editMode && (
      <input
        type="text"
        name={`bodyof${choice.id}`}
        onChange={e => handleBodyChange(e.target.value)}
        value={choice.body}
      />
    )}
    {children}
  </div>
);
Choice.propTypes = {
  label: PropTypes.string.isRequired,
  choice: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  handleBodyChange: PropTypes.func
};

Choice.defaultProps = {
  editMode: false,
  handleBodyChange: () =>
    console.log(
      "You Have Not Set A handleBodyChange Function For The Choice Inputs"
    )
};

export default Choice;
