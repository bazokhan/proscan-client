import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from 'layout/Main';
import routes from './routes';

const Session = () => (
  <Main>
    <Switch>
      <Route path="/sessions/:sessionId/edit" component={routes.edit} />
      <Route path="/sessions/:sessionId/preview" component={routes.preview} />
      <Route path="/sessions/:sessionId/start" component={routes.start} />
      <Route path="/sessions/:sessionId/" component={routes.details} />
      <Route exact path="/sessions/" component={routes.list} />
    </Switch>
  </Main>
);

export default Session;
