import { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo';
import tokenGql from './gql/token.gql';

const useAuthToken = () => {
  const client = useApolloClient();
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutLoading, setLogoutLoading] = useState(false);
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
  const logout = async cb => {
    setLogoutLoading(true);
    await client.writeQuery({
      query: tokenGql,
      data: {
        token: {
          id: 'auth_token',
          __typename: 'Token',
          token: null
        }
      }
    });
    setAuthToken(null);
    await client.resetStore();
    setLogoutLoading(false);
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
  return {
    client,
    isLoading,
    authToken,
    setAuthToken,
    login,
    logout,
    isLogoutLoading
  };
};

export default useAuthToken;
