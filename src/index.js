import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { HttpLink, ApolloClient, InMemoryCache } from "apollo-client-preset";

import App from "./app";
import { serverUri } from "./app/constants";
import * as serviceWorker from "./serviceWorker";

const gqlServerLink = new HttpLink({ uri: serverUri });
const client = new ApolloClient({
  link: gqlServerLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
