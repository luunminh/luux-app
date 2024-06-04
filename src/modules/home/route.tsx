import { PREFIX_ROUTE } from '@config/paths';
import { CustomRoute } from '@containers';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const HomePage = lazy(() => import('./views/HomePage'));
const LandingPage = lazy(() => import('./views/LandingPage'));
export const homePaths = {
  landingPage: `/${PREFIX_ROUTE}/home`,
  home: `/${PREFIX_ROUTE}/my-designs`,
};

export const homeRoutes = [
  <Route
    key={homePaths.home}
    path={homePaths.home}
    element={
      <CustomRoute>
        <HomePage />
      </CustomRoute>
    }
  />,
  <Route
    key={homePaths.landingPage}
    path={homePaths.landingPage}
    element={
      <CustomRoute pageRequiredAuth={false}>
        <LandingPage />
      </CustomRoute>
    }
  />,
];
