const authPaths = {
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
};

export const PATHS = {
  root: '',
  templates: '/templates',
  settings: '/settings',
  design: '/design',

  ...authPaths,

  dev: '/dev',
};

export const HIDE_NAV_PATHS: string[] = [
  PATHS.login,
  PATHS.signup,
  PATHS.forgotPassword,
  PATHS.resetPassword,
];

export const HIDE_SIDEBAR_PATHS: string[] = [
  PATHS.login,
  PATHS.signup,
  PATHS.forgotPassword,
  PATHS.resetPassword,
];

export const NOT_REQUIRED_AUTH_PATHS: string[] = [
  PATHS.login,
  PATHS.signup,
  PATHS.forgotPassword,
  PATHS.resetPassword,
];
