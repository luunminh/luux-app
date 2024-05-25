import { PREFIX_ROUTE } from '@config/paths';
import { CustomRoute } from '@containers';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const HomePage = lazy(() => import('./views/HomePage'));

export const homePaths = {
  home: `/${PREFIX_ROUTE}/home`,
};

export const homeRoutes = [
  <Route
    key={homePaths.home}
    path={homePaths.home}
    element={
      <CustomRoute pageRequiredAuth={false}>
        <HomePage />
      </CustomRoute>
    }
  />,
];
