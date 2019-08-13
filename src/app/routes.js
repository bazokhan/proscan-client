import { lazy } from 'react';

export default {
  home: lazy(() => import('pages/home')),
  login: lazy(() => import('pages/login')),
  signup: lazy(() => import('pages/signup')),
  sessions: lazy(() => import('pages/sessions')),
  session: lazy(() => import('pages/session')),
  join: lazy(() => import('pages/join')),
  joined: lazy(() => import('pages/joined')),
  create: lazy(() => import('pages/create'))
};
