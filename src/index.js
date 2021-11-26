import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import App from './app';
import { serverUri, webSocketUri } from './app/constants';
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
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });
  const httpLink = createUploadLink({
    uri: serverUri
  });

  const wsLink = new WebSocketLink({
    uri: webSocketUri,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    }
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  // const client = new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache
  // });

  const client = new ApolloClient({
    link: authLink.concat(link),
    cache
  });

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
