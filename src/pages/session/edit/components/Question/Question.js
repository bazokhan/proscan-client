import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DeleteIcon } from 'layout/material-ui/icons';
import DropZone from 'layout/DropZone';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Question = ({
  question,
  children,
  handleQuestionBodyChange,
  handleUploadImages
}) => {
  const [hasImages, setHasImages] = useState(
    !!question.images && question.images.length > 0
  );

  return (
    <>
      <IconButton size="small">
        <DeleteIcon />
      </IconButton>
      <TextField
        variant="outlined"
        margin="normal"
        required
        multiline
        fullWidth
        id={`bodyof${question.id}`}
        label="Question Text"
        name={`bodyof${question.id}`}
        onChange={e => handleQuestionBodyChange(question.id, e.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={hasImages}
            onChange={() => setHasImages(!hasImages)}
          />
        }
        label="This Question Has Images."
      />
      {hasImages && (
        <DropZone
          handleSubmit={images => handleUploadImages(question.id, images)}
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
  handleUploadImages: PropTypes.func.isRequired
};

Question.defaultProps = {
  children: null
};

export default Question;
