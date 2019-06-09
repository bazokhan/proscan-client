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
  return { client, isLoading, authToken, setAuthToken };
};

export default useAuthToken;
