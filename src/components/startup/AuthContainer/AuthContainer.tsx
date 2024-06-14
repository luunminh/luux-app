import appConfigs from '@config';
import { ErrorService, Navigator, TokenService, isEmpty, useComponentDidMount } from '@core/common';
import { useProfile } from '@core/queries';
import { useAuthStore } from '@core/store';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

const AuthContainer: FC<Props> = () => {
  const { onSetIsAuthenticated, onSetUserProfile } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const { getMyProfile } = useProfile();

  const handleGetProfile = () => {
    getMyProfile()
      .then((res) => {
        if (res.data) {
          const user = res.data;

          onSetUserProfile(user);
          onSetIsAuthenticated(true);
        } else {
          clearAuth();
        }
      })
      .catch((error) => {
        clearAuth();
        ErrorService.handler(error);
      });
  };

  useComponentDidMount(() => {
    const flag =
      appConfigs.MODE === 'development'
        ? searchParams.has(TokenService.ACCESS_TOKEN) &&
          searchParams.has(TokenService.REFRESH_TOKEN)
        : true;

    if (flag && isEmpty(TokenService.getACToken()) && isEmpty(TokenService.getRFToken())) {
      const accessToken = searchParams.get(TokenService.ACCESS_TOKEN);
      const refreshToken = searchParams.get(TokenService.REFRESH_TOKEN);

      TokenService.setACToken(accessToken);
      TokenService.setRFToken(refreshToken);

      searchParams.delete(TokenService.ACCESS_TOKEN);
      searchParams.delete(TokenService.REFRESH_TOKEN);

      setSearchParams(searchParams);
      window.location.reload();
      handleGetProfile();
    } else {
      handleGetProfile();
    }
  });

  const handleJumpToPortals = (userType: string) => {
    let params;

    if (appConfigs.MODE === 'development') {
      params = {
        accessToken: TokenService.getACToken(),
        refreshToken: TokenService.getRFToken(),
      };
    }

    switch (userType) {
      case 'ADMIN':
        return Navigator.jumpToWebAdmin(params);
      case 'USER':
        return Navigator.jumpToWebApp(params);
      default:
        return Navigator.jumpToWebIdentity();
    }
  };

  const clearAuth = () => {
    TokenService.clearTokens();

    onSetUserProfile(null);
    onSetIsAuthenticated(false);
  };

  return null;
};

type Props = {};

export default AuthContainer;
