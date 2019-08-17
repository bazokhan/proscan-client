import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import DropZone from 'layout/DropZone';

const Question = ({
  question,
  children,
  handleQuestionBodyChange,
  handleUploadImages,
  handleDeleteQuestion
}) => {
  const [hasImages, setHasImages] = useState(
    !!question.images && question.images.length > 0
  );

  const handleBodyChange = e =>
    handleQuestionBodyChange(question, e.target.value);
  const handleDelete = () => handleDeleteQuestion(question);

  return (
    <>
      <button type="button" className="button-small" onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <input
        type="text"
        className="input"
        placeholder="Enter question text"
        name={`bodyof${question.id}`}
        onChange={handleBodyChange}
        value={question.body}
      />
      <label htmlFor="hasImages" className="label">
        <input
          type="checkbox"
          name="hasImages"
          checked={hasImages}
          onChange={() => setHasImages(!hasImages)}
        />
        <span>This Question Has Images.</span>
      </label>
      {hasImages && (
        <DropZone
          handleSubmit={images => handleUploadImages(question, images)}
          images={question.images || []}
        />
      )}
      {children}
    </>
  );
};

Question.propTypes = {
  children: PropTypes.node,
  question: PropTypes.object.isRequired,
  handleQuestionBodyChange: PropTypes.func.isRequired,
  handleUploadImages: PropTypes.func.isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired
};

Question.defaultProps = {
  children: null
};

export default Question;
