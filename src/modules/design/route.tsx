import { CustomRoute } from '@containers';
import { Navigator } from '@core/common';
import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { DesignProvider } from './view/DesignForm';
import { DesignFormWrapper } from './view/DesignForm/DesignForm';

const DesignForm = lazy(() => import('./view/DesignForm'));

const PREFIX_ROUTE = Navigator.getCurrentPortalUrl();

export const designPaths = {
  listDesign: `${PREFIX_ROUTE}/design',`,
  design: `${PREFIX_ROUTE}/design`,
};

export const designRoutes = [
  <Route
    key={`${designPaths.design}/:id`}
    path={`${designPaths.design}/:id`}
    element={
      <CustomRoute>
        <DesignProvider>
          <DesignFormWrapper />
        </DesignProvider>
      </CustomRoute>
    }
  />,
];
