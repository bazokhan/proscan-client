import React from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Loading = ({ error, timedOut, pastDelay, retry }) => {
  if (error) {
    console.log(error);
    return (
      <div>
        Error Loading Page !<button onClick={retry}>Retry</button>
        <Link to="/">Home</Link>
      </div>
    );
  }
  if (pastDelay) {
    return <div>Loading..</div>;
  }
  if (timedOut) {
    return <div>Taking A Little Longer Than Expected !.. Please Wait</div>;
  }
  return null;
};

Loading.propTypes = {
  error: PropTypes.object,
  timedOut: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired,
  retry: PropTypes.func
};

Loading.defaultProps = {
  loading: {},
  retry: () => {}
};

const loadable = (component, render) => {
  const loadableConfig = {
    loader: () => component,
    loading: Loading,
    delay: 300,
    timeout: 10000
  };
  if (render) {
    loadableConfig.render = render;
  }
  return Loadable(loadableConfig);
};

export default loadable;
