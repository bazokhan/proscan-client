import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {
  InMemoryCache,
  defaultDataIdFromObject
} from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from 'react-apollo-hooks';
import App from './app';
import serverUri from './app/constants';
import * as serviceWorker from './serviceWorker';

const render = async () => {
  const cache = new InMemoryCache({
    dataIdFromObject: object => defaultDataIdFromObject(object) // fall back to default handling
  });
  const client = new ApolloClient({
    uri: serverUri,
    cache
  });

  try {
    await persistCache({ cache, storage: window.localStorage });
  } catch (e) {
    console.log(e);
  }

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
