import { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo';
import guestGql from './gql/guest.gql';

const useGuestSession = () => {
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGuest = async () => {
      setIsLoading(true);
      try {
        const {
          guest: { guestId: guest, username: name, sessionId: session }
        } = await client.readQuery({ query: guestGql });
        setGuestId(guest);
        setUsername(name);
        setSessionId(session);
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };
    getGuest();
  }, [client]);

  const guestLogout = async cb => {
    setIsLoading(true);
    try {
      await client.writeQuery({
        query: guestGql,
        data: {
          guest: {
            id: 'guest_id',
            guestId: '',
            username: '',
            sessionId: '',
            __typename: 'Guest'
          }
        }
      });
      setGuestId('');
      setUsername('');
      setSessionId('');
      setIsLoading(false);
      if (cb && typeof cb === 'function') {
        cb();
      }
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  const guestLogin = async ({
    guestId: guest,
    username: name,
    sessionId: session
  }) => {
    setIsLoading(true);
    try {
      await client.writeQuery({
        query: guestGql,
        data: {
          guest: {
            id: 'guest_id',
            guestId: guest,
            username: name,
            sessionId: session,
            __typename: 'Guest'
          }
        }
      });
      setGuestId(guest);
      setUsername(name);
      setSessionId(session);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  return {
    guestId,
    sessionId,
    username,
    client,
    isLoading,
    guestLogin,
    guestLogout,
    error
  };
};

export default useGuestSession;
