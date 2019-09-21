import React from 'react';
import {
  FaSignOutAlt,
  FaHome,
  FaSearch,
  FaUserAlt,
  FaFolderOpen,
  FaFolderPlus,
  FaUserPlus,
  FaSignInAlt
} from 'react-icons/fa';

const authenticatedList = [
  {
    text: 'Manage sessions',
    iconComponent: <FaFolderOpen />,
    route: '/sessions'
  },
  {
    text: 'Create a new session',
    iconComponent: <FaFolderPlus />,
    route: '/sessions/create'
  },
  {
    text: 'Profile',
    iconComponent: <FaUserAlt />,
    route: '/profile'
  },
  {
    text: 'Logout',
    iconComponent: <FaSignOutAlt />,
    route: '/logout'
  }
];
const guestList = [
  {
    text: 'Login',
    iconComponent: <FaSignInAlt />,
    route: '/login'
  },
  {
    text: 'Signup',
    iconComponent: <FaUserPlus />,
    route: '/signup'
  }
];
const commonList = [
  {
    text: 'Home',
    iconComponent: <FaHome />,
    route: '/'
  },
  {
    text: 'Join a session',
    iconComponent: <FaSearch />,
    route: '/join'
  }
];

export { authenticatedList, guestList, commonList };
