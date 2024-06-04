import { LoadingContainer } from '@components';
import { PREFIX_ROUTE } from '@config/paths';
import { designRoutes } from '@modules/design/route';
import { homePaths, homeRoutes } from '@modules/home/route';
import { FC, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const NotFound = lazy(() => import('@components/NotFound'));

const routes = [...homeRoutes, ...designRoutes];

type RootContainerProps = {};

const RootContainer: FC<RootContainerProps> = () => {
  return (
    <Suspense fallback={<LoadingContainer />}>
      <Routes>
        {...routes}

        <Route path={`${PREFIX_ROUTE}`} element={<Navigate to={homePaths.landingPage} />} />
        <Route path={`${PREFIX_ROUTE}/*`} element={<NotFound />} />
        <Route path={`*`} element={<Navigate to={homePaths.landingPage} />} />
      </Routes>
    </Suspense>
  );
};

export default RootContainer;
