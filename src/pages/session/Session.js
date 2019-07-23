import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Main from 'layout/Main';
import SessionContext from 'context/SessionContext';
import useSession from './hooks/useSession';
import routes from './routes';

const Session = ({ match }) => {
  const contextValue = useSession(match.params.sessionId);
  return (
    <SessionContext.Provider value={contextValue}>
      <Main>
        <Switch>
          <Route path="/sessions/:sessionId/edit" component={routes.edit} />
          <Route
            path="/sessions/:sessionId/preview"
            component={routes.preview}
          />
          <Route path="/sessions/:sessionId/start" component={routes.start} />
          <Route path="/sessions/:sessionId/" component={routes.details} />
        </Switch>
      </Main>
    </SessionContext.Provider>
  );
};

Session.propTypes = {
  match: PropTypes.object.isRequired
};

export default Session;
