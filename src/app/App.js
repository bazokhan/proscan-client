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
        <Route path="/join" component={routes.join} />
        <Route path="/sessions/create" component={routes.create} />
        <Route path="/sessions/:sessionId" component={routes.session} />
        <Route path="/sessions" component={routes.sessions} />
        <Route path="/:sessionId" component={routes.joined} />
        <Route path="/" component={routes.home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
