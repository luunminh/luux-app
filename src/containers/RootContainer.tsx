import { LoadingContainer } from '@components';
import { PATHS } from '@config/paths';
import { uamRoutes } from '@modules/uam/route';
import { FC, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Root from './Root';

const NotFound = lazy(() => import('@components/NotFound'));

const testPaths = [<Route key={PATHS.root} path={PATHS.root} element={<Root />} />];

const routes = [...uamRoutes, ...testPaths];

type RootContainerProps = {};

const RootContainer: FC<RootContainerProps> = () => {
  return (
    <Suspense fallback={<LoadingContainer />}>
      <Routes>
        {...routes}

        <Route path={`/*`} element={<NotFound />} />
        <Route path={'*'} element={<Navigate to={PATHS.root} />} />
      </Routes>
    </Suspense>
  );
};

export default RootContainer;
