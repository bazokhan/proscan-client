import { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo';
import tokenGql from './gql/token.gql';

const useAuthToken = () => {
  const client = useApolloClient();
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          token: { token }
        } = await client.readQuery({ query: tokenGql });
        setAuthToken(token);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };
    getToken();
  }, [client]);
  const logout = cb => {
    client.writeQuery({
      query: tokenGql,
      data: {
        token: {
          id: 'auth_token',
          __typename: 'Token',
          token: null
        }
      }
    });
    client.resetStore();
    setAuthToken(null);
    if (cb && typeof cb === 'function') {
      cb();
    }
  };
  const login = loginMutationResult => {
    client.writeQuery({
      query: tokenGql,
      data: {
        token: { ...loginMutationResult, id: 'auth_token' }
      }
    });
    setAuthToken(loginMutationResult.token);
  };
  return { client, isLoading, authToken, setAuthToken, login, logout };
};

export default useAuthToken;
