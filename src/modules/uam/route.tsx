import { lazy } from 'react';
import { Route } from 'react-router-dom';

const SignIn = lazy(() => import('./view/SignIn'));
const SignUp = lazy(() => import('./view/SignUp'));
const ForgotPassword = lazy(() => import('./view/ForgotPassword'));
const ResetPassword = lazy(() => import('./view/ResetPassword'));

export const uamPaths = {
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
};

export const uamRoutes = [
  <Route key={uamPaths.login} path={uamPaths.login} element={<SignIn />} />,
  <Route key={uamPaths.signup} path={uamPaths.signup} element={<SignUp />} />,
  <Route
    key={uamPaths.forgotPassword}
    path={uamPaths.forgotPassword}
    element={<ForgotPassword />}
  />,
  <Route key={uamPaths.resetPassword} path={uamPaths.resetPassword} element={<ResetPassword />} />,
];
