import React from 'react';
import cx from 'class-names';
import { Link } from 'react-router-dom';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import { FaUserTag, FaAt, FaFolderOpen, FaSignOutAlt } from 'react-icons/fa';
import profileGql from 'pages/home/gql/profile.gql';
import styles from './Profile.module.scss';

const Profile = () => {
  const {
    data: { profile },
    loading,
    error
  } = useQuery(profileGql);

  if (error) {
    return <div>Error, {error.message}</div>;
  }
  if (loading) {
    return (
      <Main>
        <CircularProgress />
      </Main>
    );
  }

  return (
    <Main>
      <h1 className="h1">Profile</h1>
      <div className="box info">
        <div className="row jst-left">
          <div className="row-item margin-right subtitle">
            <FaUserTag />
          </div>
          <h1 className="row-item subtitle">{profile.username}</h1>
        </div>
        <div className="row jst-left">
          <div className="row-item margin-right subtitle">
            <FaAt />
          </div>
          <h1 className="row-item subtitle">{profile.email}</h1>
        </div>
        <div className="row jst-left">
          <div className="row-item margin-right subtitle">
            <FaFolderOpen />
          </div>
          <h1 className="row-item subtitle">
            {profile.sessions ? profile.sessions.length : 0} sessions
          </h1>
        </div>
      </div>
      <Link to="/logout" className={cx(styles.button, styles.full, 'accent2')}>
        <FaSignOutAlt />
        <h2>Logout</h2>
      </Link>
    </Main>
  );
};
export default Profile;
