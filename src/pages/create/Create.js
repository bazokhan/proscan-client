import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import Main from 'layout/Main';
// import SessionContext from 'context/SessionContext';
// import SessionForm from './components/SessionForm';
// import useSession from './hooks/useSession';
import createSessionGql from './gql/createSession.gql';
// import createQuestionsGql from './gql/createQuestions.gql';

const Create = ({ history }) => {
  // const contextValue = useSession();

  const [publicId, setPublicId] = useState('');
  const [sessionError, setSessionError] = useState(null);
  // const [questions] = useState([]);
  // const [questionsError, setQuestionsError] = useState(null);

  // const [createQuestionsMutation] = useMutation(createQuestionsGql, {
  //   variables: { publicId, questions },
  //   onError: e => {
  //     console.log('Questions Mutation Errored');
  //     console.log(e);
  //     setQuestionsError(e.message);
  //   },
  //   onCompleted: data => {
  //     if (questionsError) {
  //       return;
  //     }
  //     console.log('Questions Mutation Completed');
  //     console.log(data);
  //     setQuestionsError(null);
  //   }
  // });

  const [createSessionMutation] = useMutation(createSessionGql, {
    variables: { publicId },
    onError: e => {
      // console.log('Session Mutation Errored');
      // console.log(e);
      setSessionError(e.message);
    },
    onCompleted: () => {
      if (sessionError) {
        return;
      }
      // console.log('Session Mutation Completed');
      // console.log(data);
      // createQuestionsMutation(questions);
      // setSessionError(null);
      history.push(`/sessions/${publicId}/edit`);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    createSessionMutation();
  };

  const handlePublicIdChange = e => {
    setSessionError(null);
    setPublicId(e.target.value);
  };

  return (
    // <SessionContext.Provider value={contextValue}>
    <Main>
      <h1 className="h1">Create A New Session</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="publicId" className="label">
          <span>Public ID</span>
          <input
            name="publicId"
            type="text"
            className="input"
            placeholder="Public ID"
            onChange={handlePublicIdChange}
          />
        </label>
        <button
          type="submit"
          className="button"
          disabled={!publicId || sessionError}
        >
          Save Session
        </button>
        {sessionError && <div className="toast-error">{sessionError}</div>}
      </form>
      {/* {questionsError && <div>{questionsError}</div>} */}
      {/* <SessionForm /> */}
    </Main>
    // {/* </SessionContext.Provider> */}
  );
};

Create.propTypes = {
  history: PropTypes.object.isRequired
};

export default Create;
