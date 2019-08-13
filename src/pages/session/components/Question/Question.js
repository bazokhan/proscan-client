import React from 'react';
import PropTypes from 'prop-types';
import ImagePreviews from 'layout/ImagePreviews';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Question = ({ question, children }) => (
  <>
    <Grid>
      <Typography variant="subtitle1">{question.body}</Typography>
      {question.images && <ImagePreviews images={question.images} />}
    </Grid>
    {children}
  </>
);

Question.propTypes = {
  children: PropTypes.node,
  question: PropTypes.object.isRequired
};

Question.defaultProps = {
  children: null
};

export default Question;
