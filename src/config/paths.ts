import { uamPaths } from '@modules/uam/route';

export const PATHS = {
  root: '',
  templates: '/templates',
  settings: '/settings',
  design: '/design',

  dev: '/dev',
};

// project paths

// design paths

export const HIDE_NAV_PATHS: string[] = [...Object.values(uamPaths)];

export const HIDE_SIDEBAR_PATHS: string[] = [...Object.values(uamPaths)];

export const NOT_REQUIRED_AUTH_PATHS: string[] = [...Object.values(uamPaths)];
