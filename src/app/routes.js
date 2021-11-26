import { lazy } from 'react';

export default {
  home: lazy(() => import('pages/home')),
  login: lazy(() => import('pages/login')),
  signup: lazy(() => import('pages/signup')),
  profile: lazy(() => import('pages/profile')),
  join: lazy(() => import('pages/join')),
  joined: lazy(() => import('pages/joined')),
  create: lazy(() => import('pages/create')),
  sessions: lazy(() => import('pages/session')),
  logout: lazy(() => import('pages/logout'))
};
