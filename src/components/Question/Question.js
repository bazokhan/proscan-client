import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { TextField, Typography, IconButton } from "layout/material-ui/core";
import { DeleteIcon } from "layout/material-ui/icons";
import Section from "layout/Section";
import DropZone from "layout/DropZone";
import ImagePreviews from "layout/ImagePreviews";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Question = ({
  label,
  question,
  editMode,
  children,
  handleLabelChange,
  handleBodyChange,
  handleUploadImages
}) => {
  const [hasImages, setHasImages] = useState(
    !!question.images && question.images.length > 0
  );
  return (
    <Fragment>
      <Section flex="column flex-start" borderBottom>
        {!editMode && <Typography variant="h6">{label}</Typography>}
        {editMode && (
          <Section flex="row space-between">
            <Typography variant="h6">{label}</Typography>
            <IconButton size="small">
              <DeleteIcon />
            </IconButton>
          </Section>
        )}
        {!editMode && (
          <Typography variant="subtitle1">{question.body}</Typography>
        )}
        {editMode && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            multiline
            fullWidth
            id={`bodyof${question.id}`}
            label="Question Text"
            name={`bodyof${question.id}`}
            onChange={e => handleBodyChange(e.target.value)}
            value={question.body}
          />
        )}
        {editMode && (
          <FormControlLabel
            control={
              <Checkbox
                checked={hasImages}
                onChange={() => setHasImages(!hasImages)}
              />
            }
            label="This Question Has Images."
          />
        )}
        {editMode && hasImages && (
          <DropZone
            handleSubmit={handleUploadImages}
            images={question.images || []}
          />
        )}
        {!editMode && question.images && (
          <ImagePreviews images={question.images} />
        )}
      </Section>
      {children}
    </Fragment>
  );
};
Question.propTypes = {
  label: PropTypes.string,
  question: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  handleLabelChange: PropTypes.func,
  handleBodyChange: PropTypes.func,
  handleUploadImages: PropTypes.func
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
    ),
  handleUploadImages: images =>
    console.log(
      "You Have Not Set A handleUploadImages Function For The Question Images"
    )
};

export default Question;
