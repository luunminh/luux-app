import { CustomRoute } from '@containers';
import { Navigator } from '@core/common';
import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { DesignProvider } from './view/DesignForm';

const DesignForm = lazy(() => import('./view/DesignForm'));

const PREFIX_ROUTE = Navigator.getCurrentPortalUrl();

export const designPaths = {
  listDesign: `${PREFIX_ROUTE}/design',`,
  addDesign: `${PREFIX_ROUTE}/design/add`,
  editDesign: `${PREFIX_ROUTE}/design/edit`,
};

export const designRoutes = [
  <Route
    key={designPaths.addDesign}
    path={designPaths.addDesign}
    element={
      <CustomRoute>
        <DesignProvider>
          <DesignForm />
        </DesignProvider>
      </CustomRoute>
    }
  />,
];
