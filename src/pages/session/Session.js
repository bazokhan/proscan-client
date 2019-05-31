import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

const Session = () => {
  return (
    <div>
      <Switch>
        <Route path="/sessions/:sessionId/edit" component={routes.edit} />
        <Route path="/sessions/:sessionId/preview" component={routes.preview} />
        <Route path="/sessions/:sessionId/start" component={routes.start} />
        <Route path="/sessions/:sessionId/" component={routes.details} />
      </Switch>
    </div>
  );
};
export default Session;
