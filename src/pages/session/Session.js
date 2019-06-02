import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Main from "layout/Main";

const Session = () => {
  return (
    <Main>
      <Switch>
        <Route path="/sessions/:sessionId/edit" component={routes.edit} />
        <Route path="/sessions/:sessionId/preview" component={routes.preview} />
        <Route path="/sessions/:sessionId/start" component={routes.start} />
        <Route path="/sessions/:sessionId/" component={routes.details} />
      </Switch>
    </Main>
  );
};
export default Session;
