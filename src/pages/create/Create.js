import React from 'react';
import Main from 'layout/Main';
import SessionForm from 'components/SessionForm';
import SessionContext from 'context/SessionContext';
import Header from './components/Header';
import useSession from './hooks/useSession';

const Create = () => {
  const contextValue = useSession();

  return (
    <SessionContext.Provider value={contextValue}>
      <Main>
        <Header />
        <SessionForm />
      </Main>
    </SessionContext.Provider>
  );
};
export default Create;
