import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'app/Theme';

const snakeToCamel = string => {
  const className = string
    .split(' ')
    .map(word => word.split('-'))
    .reduce((acc, next) => [...acc, ...next])
    .reduce((acc, next) => acc + next.charAt(0).toUpperCase() + next.slice(1));
  return className;
};

const Section = ({ classes, flex, borderBottom, children }) => {
  const styles = useStyles({ classes });
  const flexStyle = snakeToCamel(flex);
  return (
    <div
      className={`${styles.section} ${styles[flexStyle]} ${
        borderBottom ? styles.borderBottom : ''
      }`}
    >
      {children}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classes: PropTypes.object,
  flex: PropTypes.oneOf([
    'row flex-start',
    'row flex-end',
    'row center',
    'row space-between',
    'row space-around',
    'column flex-start',
    'column flex-end',
    'column center',
    'column space-between',
    'column space-around'
  ]),
  borderBottom: PropTypes.bool
};

Section.defaultProps = {
  classes: {},
  flex: 'row flex-start',
  borderBottom: false
};

export default Section;
