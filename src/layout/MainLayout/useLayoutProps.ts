import { HIDE_NAV_PATHS, HIDE_SIDEBAR_PATHS, NOT_REQUIRED_AUTH_PATHS } from '@config/paths';
import { usePathname } from '@core/common';

const useLayoutProps = () => {
  const { pathname } = usePathname();

  const isHideNav = HIDE_NAV_PATHS.some((path) => pathname.includes(path));
  const isHideSidebar = HIDE_SIDEBAR_PATHS.some((path) => pathname.includes(path));
  const isNotRequiredAuth = NOT_REQUIRED_AUTH_PATHS.some((path) => pathname.includes(path));

  return {
    isHideNav,
    isHideSidebar,
    isNotRequiredAuth,
  };
};
export default useLayoutProps;
