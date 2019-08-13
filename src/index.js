import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import ApolloClient, {
//   InMemoryCache,
//   defaultDataIdFromObject
// } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from 'react-apollo';
import App from './app';
import serverUri from './app/constants';
import * as serviceWorker from './serviceWorker';

const getToken = () => {
  const cache = localStorage.getItem('apollo-cache-persist');
  if (cache) {
    const tokenStore = JSON.parse(cache)['Token:auth_token'];
    if (tokenStore) {
      return tokenStore.token;
    }
  }
  return null;
};

const render = async () => {
  const cache = new InMemoryCache();
  try {
    await persistCache({ cache, storage: localStorage });
  } catch (e) {
    ReactDOM.render(<div>Error !!!</div>, document.getElementById('root'));
    return;
  }
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken();
    // return the headers to the context so httpLink can read them
    console.log({ token });
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });
  const httpLink = createHttpLink({
    uri: serverUri
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
  });

  ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Suspense>,
    document.getElementById('root')
  );
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
