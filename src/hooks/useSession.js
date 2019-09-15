import { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import sessionByIDGql from './gql/sessionByID.gql';

const useSession = id => {
  const [session, setSession] = useState(null);
  const [publicId, setPublicId] = useState('');
  const [questions, setQuestions] = useState([]);

  const { data, error, loading, refetch } = useQuery(sessionByIDGql, {
    variables: { publicId: id },
    fetchPolicy: 'cache-and-network'
  });

  const refetchSession = async () => {
    await refetch({
      variables: { publicId: id },
      fetchPolicy: 'cache-and-network'
    });
  };

  useEffect(() => {
    if (data && data.sessionByID) {
      setSession(data.sessionByID);
      setPublicId(data.sessionByID.publicId);
      setQuestions(data.sessionByID.questions);
    }
  }, [data]);

  return { session, publicId, questions, error, loading, refetchSession };
};

export default useSession;
