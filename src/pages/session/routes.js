import { lazy } from 'react';

export default {
  details: lazy(() => import('./details')),
  edit: lazy(() => import('./edit')),
  preview: lazy(() => import('./preview')),
  start: lazy(() => import('./start'))
};
