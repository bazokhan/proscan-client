import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(2)
  },
  light: {
    backgroundImage: 'linear-gradient(to bottom right, #FFF, #DDD)'
  },
  dark: {
    backgroundImage: 'linear-gradient(to bottom right, #1AAAE3, #2AB679)'
  }
}));

const Section = ({ children, variant, ...props }) => {
  const classes = useStyles();
  const getVariantClass = () => {
    if (variant === 'dark') return classes.dark;
    if (variant === 'light') return classes.light;
    return '';
  };
  return (
    <div className={`${classes.section} ${getVariantClass()}`}>
      <Grid container {...props}>
        {children}
      </Grid>
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  variant: PropTypes.oneOf(['transparent', 'light', 'dark'])
};

Section.defaultProps = {
  variant: 'transparent'
};

export default Section;
