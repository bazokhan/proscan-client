import React, { useState, Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { DeleteIcon } from 'layout/material-ui/icons';
import Section from 'layout/NewSection';
import DropZone from 'layout/DropZone';
import ImagePreviews from 'layout/ImagePreviews';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SessionContext from 'context/SessionContext';

const Question = ({ question, children }) => {
  const [body, setBody] = useState(question.body);
  const [hasImages, setHasImages] = useState(
    !!question.images && question.images.length > 0
  );

  const { editMode, handleQuestionBodyChange, handleUploadImages } = useContext(
    SessionContext
  );

  return (
    <Fragment>
      <Section>
        {!editMode ? (
          <Grid>
            <Typography variant="subtitle1">{question.body}</Typography>
            {question.images && <ImagePreviews images={question.images} />}
          </Grid>
        ) : (
          <Grid>
            <Grid>
              <IconButton size="small">
                <DeleteIcon />
              </IconButton>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              required
              multiline
              fullWidth
              id={`bodyof${question.id}`}
              label="Question Text"
              name={`bodyof${question.id}`}
              onBlur={() => handleQuestionBodyChange(question.id, body)}
              onChange={e => setBody(e.target.value)}
              value={body}
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
          </Grid>
        )}
      </Section>
      {children}
    </Fragment>
  );
};
Question.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  question: PropTypes.object.isRequired
};

Question.defaultProps = {
  children: null
};

export default Question;
