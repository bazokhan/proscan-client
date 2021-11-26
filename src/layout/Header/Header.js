import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import { FaBars } from 'react-icons/fa';
import styles from './Header.module.scss';

const Sidebar = ({ commonList, guestList, authenticatedList }) => {
  const [isExpanded, setExpanded] = useState(false);
  const { isLoading, authToken } = useContext(AuthContext);
  const toggleExpanded = () => setExpanded(!isExpanded);
  return (
    <nav className={styles.container}>
      <div className={styles.navbar}>
        <button
          type="button"
          onClick={toggleExpanded}
          className={styles.basicButton}
        >
          <FaBars />
        </button>
        <Link to="/" className={cx(styles.logo, 'link subtitle')}>
          QuizBank
        </Link>
      </div>
      {!isLoading && (
        <div
          className={cx(styles.bottom, {
            [styles.isExpanded]: isExpanded
          })}
        >
          {commonList.map(({ iconComponent, route, text }) => (
            <NavLink
              key={route}
              exact
              to={route}
              className={styles.iconMain}
              onClick={toggleExpanded}
            >
              {iconComponent}
              <span>{text}</span>
            </NavLink>
          ))}
          {authToken &&
            authenticatedList.map(({ iconComponent, route, text }) => (
              <NavLink
                key={route}
                exact
                to={route}
                className={styles.iconMain}
                onClick={toggleExpanded}
              >
                {iconComponent}
                <span>{text}</span>
              </NavLink>
            ))}
          {!authToken &&
            guestList.map(({ iconComponent, route, text }) => (
              <NavLink
                key={route}
                exact
                to={route}
                className={styles.iconMain}
                onClick={toggleExpanded}
              >
                {iconComponent}
                <span>{text}</span>
              </NavLink>
            ))}
        </div>
      )}
    </nav>
  );
};

Sidebar.propTypes = {
  commonList: PropTypes.array,
  guestList: PropTypes.array,
  authenticatedList: PropTypes.array
};

Sidebar.defaultProps = {
  commonList: [],
  guestList: [],
  authenticatedList: []
};

export default Sidebar;
