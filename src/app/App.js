import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "layout/Header";
import routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { ThemeProvider } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";

function App() {
  const theme = useTheme();
  console.log(theme);
  return (
    <Fragment>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
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
      {/* </ThemeProvider> */}
    </Fragment>
  );
}

export default App;
