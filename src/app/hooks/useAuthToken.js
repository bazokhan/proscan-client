import { useState, useEffect } from 'react';
import tokenGql from 'app/gql/token.gql';
import { useApolloClient } from 'react-apollo-hooks';

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
  const logout = () => {
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
    setAuthToken(null);
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
