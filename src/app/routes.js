import loadable from 'helpers/loadable';

export default {
  home: loadable(import('../pages/home')),
  login: loadable(import('../pages/login')),
  sessions: loadable(import('../pages/sessions')),
  session: loadable(import('../pages/session')),
  join: loadable(import('../pages/join')),
  joined: loadable(import('../pages/joined')),
  create: loadable(import('../pages/create'))
};
