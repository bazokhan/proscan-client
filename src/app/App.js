import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from 'layout/Header copy';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthContext from 'context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from 'layout/Main';
import { CircularProgress } from '@material-ui/core';
import routes from './routes';
import AuthRoute from './routeTypes/AuthRoute/AuthRoute';
import { authenticatedList, guestList, commonList } from './menu.routes';
import useAuthToken from './hooks/useAuthToken';
import './styles/form.scss';
import './styles/typography.scss';
import './styles/boxes.scss';
import './styles/general.scss';
import './styles/session.scss';
import './styles/grid.scss';

function App() {
  const contextValue = useAuthToken();
  return (
    <AuthContext.Provider value={contextValue}>
      <CssBaseline />
      <BrowserRouter>
        <Header
          authenticatedList={authenticatedList}
          commonList={commonList}
          guestList={guestList}
        />
        <ToastContainer autoClose={4000} />
        <Suspense
          fallback={
            <Main>
              <CircularProgress />
            </Main>
          }
        >
          <Switch>
            <Route path="/signup" component={routes.signup} />
            <Route path="/login" component={routes.login} />
            <AuthRoute path="/sessions/create" component={routes.create} />
            <AuthRoute path="/sessions" component={routes.sessions} />
            <AuthRoute path="/profile" component={routes.profile} />
            <AuthRoute path="/logout" component={routes.logout} />
            <Route path="/join" component={routes.join} />
            <Route path="/:sessionId" component={routes.joined} />
            <Route path="/" component={routes.home} />
          </Switch>{' '}
        </Suspense>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
