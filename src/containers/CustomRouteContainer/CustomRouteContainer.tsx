import { SplashScreen } from '@components';
import { PATHS } from '@config/paths';
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

  if ((isAuthenticated && pageRequiredAuth) || (!isAuthenticated && !pageRequiredAuth)) {
    return <>{children}</>;
  }

  const redirectPath = PATHS.root;

  return <Navigate to={redirectPath} />;
};

export default CustomRoute;
