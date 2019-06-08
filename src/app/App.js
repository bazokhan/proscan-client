import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from 'layout/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthContext from 'context/AuthContext';
import routes from './routes';
import AuthRoute from './routeTypes/AuthRoute/AuthRoute';
import useAuthToken from './hooks/useAuthToken';

function App() {
  const contextValue = useAuthToken();
  return (
    <AuthContext.Provider value={contextValue}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/signup" component={routes.home} />
          <Route path="/login" component={routes.login} />
          <AuthRoute path="/sessions/create" component={routes.create} />
          <AuthRoute path="/sessions/:sessionId" component={routes.session} />
          <AuthRoute path="/sessions" component={routes.sessions} />
          <Route path="/join" component={routes.join} />
          <Route path="/:sessionId" component={routes.joined} />
          <Route path="/" component={routes.home} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
