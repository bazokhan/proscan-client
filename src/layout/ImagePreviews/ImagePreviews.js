import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  thumb: {
    height: theme.spacing(10) * 2,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#EEE'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  }
}));

const ImagePreviews = ({ handleSubmit, images }) => {
  const classes = useStyles();

  const thumbs = images.map(file => (
    <Grid item xs={12} md={6} key={file.name}>
      <div src={file.preview} className={classes.thumb}>
        <img src={file.preview} alt={file.name} className={classes.img} />
      </div>
    </Grid>
  ));

  return (
    <Grid container direction="column" align="stretch" item xs={12}>
      <Grid item xs={12} container spacing={2}>
        {thumbs}
      </Grid>
    </Grid>
  );
};

ImagePreviews.propTypes = {
  images: PropTypes.array
};

ImagePreviews.defaultProps = {
  images: []
};

export default ImagePreviews;
