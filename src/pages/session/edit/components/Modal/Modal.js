import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const Modal = ({ children, type }) => (
  <div className={styles[`container-${type}`]}>{children}</div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info'])
};

Modal.defaultProps = {
  type: 'info'
};

export default Modal;
