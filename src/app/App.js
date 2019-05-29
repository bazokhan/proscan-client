import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "layout/Header";
import routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/signup" component={routes.home} />
        <Route path="/login" component={routes.home} />
        <Route path="/join" component={routes.home} />
        <Route path="/sessions/create" component={routes.home} />
        <Route
          path="/sessions/:sessionId/edit/:questionId"
          component={routes.home}
        />
        <Route path="/sessions/:sessionId/edit" component={routes.home} />
        <Route
          path="/sessions/:sessionId/start/:questionId"
          component={routes.home}
        />
        <Route path="/sessions/:sessionId/start" component={routes.home} />
        <Route
          path="/sessions/:sessionId/preview/:questionId"
          component={routes.home}
        />
        <Route path="/sessions/:sessionId/preview" component={routes.home} />

        <Route path="/sessions/:sessionId" component={routes.session} />
        <Route path="/sessions" component={routes.sessions} />
        <Route path="/:sessionId/:questionId" component={routes.home} />
        <Route path="/:sessionId" component={routes.home} />
        <Route path="/" component={routes.home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
