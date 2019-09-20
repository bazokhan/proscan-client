import React from 'react';
import { FaBaseballBall } from 'react-icons/fa';

const authenticatedList = [
  {
    text: 'Manage sessions',
    iconComponent: <FaBaseballBall />,
    route: '/sessions'
  },
  {
    text: 'Profile',
    iconComponent: <FaBaseballBall />,
    route: '/profile'
  },
  {
    text: 'Logout',
    iconComponent: <FaBaseballBall />,
    route: '/logout'
  }
];
const guestList = [
  {
    text: 'Login',
    iconComponent: <FaBaseballBall />,
    route: '/login'
  },
  {
    text: 'Signup',
    iconComponent: <FaBaseballBall />,
    route: '/signup'
  }
];
const commonList = [
  {
    text: 'Home',
    iconComponent: <FaBaseballBall />,
    route: '/'
  },
  {
    text: 'Join a session',
    iconComponent: <FaBaseballBall />,
    route: '/join'
  }
];

export { authenticatedList, guestList, commonList };
