import { CustomRoute } from '@containers';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const DesignForm = lazy(() => import('./view/DesignForm'));

export const designPaths = {
  listDesign: '/design',
  addDesign: '/design/add',
  editDesign: '/design/edit',
};

export const designRoutes = [
  <Route
    key={designPaths.addDesign}
    path={designPaths.addDesign}
    element={
      <CustomRoute>
        <DesignForm />
      </CustomRoute>
    }
  />,
];
