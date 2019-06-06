import React from 'react';
import Main from 'layout/Main';
import SessionForm from 'components/SessionForm';
import {
  Link,
  RouterLink,
  Button,
  Avatar,
  Typography
} from 'layout/material-ui/core';
import { CreateIcon } from 'layout/material-ui/icons';
import Section from 'layout/NewSection';
import SessionContext from 'context/SessionContext';
import useSession from './hooks/useSession';

const Create = () => {
  const contextValue = useSession();

  return (
    <SessionContext.Provider value={contextValue}>
      <Main>
        <Section>
          <Avatar>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Create A New Session
          </Typography>
        </Section>
        <Section>
          <Button variant="text">
            <Link to="/" component={RouterLink}>
              Home
            </Link>
          </Button>
          <Button variant="text">
            <Link to="/sessions" component={RouterLink}>
              Back To My Sessions
            </Link>
          </Button>
        </Section>
        <Section>
          <SessionForm />
        </Section>
      </Main>
    </SessionContext.Provider>
  );
};
export default Create;
