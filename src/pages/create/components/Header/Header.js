import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Button, Avatar, Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const Header = () => (
  <>
    <Avatar>
      <CreateIcon />
    </Avatar>
    <Typography component="h1" variant="h6">
      Create A New Session
    </Typography>
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
  </>
);

export default Header;
