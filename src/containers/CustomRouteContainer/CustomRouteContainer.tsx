import { SplashScreen } from '@components';
import { PATHS } from '@config/paths';
import { ToastService } from '@core/common';
import { useAuthStore } from '@core/store';
import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

type CustomRouteProps = {
  pageRequiredAuth?: boolean;
};

/**
 * @params pageRequiredAuth?: boolean
 * @children ReactNode
 */
const CustomRoute: FC<PropsWithChildren<CustomRouteProps>> = ({
  pageRequiredAuth = true,
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated === null) return <SplashScreen />;

  if ((isAuthenticated && pageRequiredAuth) || !pageRequiredAuth) {
    return <>{children}</>;
  }

  const redirectPath = PATHS.root;

  ToastService.error('You are not authorized to access this page');

  return <Navigate to={redirectPath} />;
};

export default CustomRoute;
