import { CustomErrorBoundary, Navbar } from '@components';
import appConfigs from '@config';
import { LoadingGlobalContainer } from '@containers';
import { AuthContainer } from '@core/startup';
import { AppShell } from '@mantine/core';
import { PropsWithChildren } from 'react';
import useLayoutProps from './useLayoutProps';

type MainLayoutProps = PropsWithChildren;

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isHideNav, isHideSidebar } = useLayoutProps();

  return (
    <CustomErrorBoundary showErrorMessage>
      <AppShell
        // padding="sm"
        header={{
          collapsed: isHideNav,
          height: appConfigs.NAVBAR_HEIGHT,
        }}
      >
        <AppShell.Header>
          <Navbar />
        </AppShell.Header>
        <AppShell.Navbar />

        <AppShell.Main>
          {children}

          <AuthContainer />
          <LoadingGlobalContainer />
        </AppShell.Main>
      </AppShell>
    </CustomErrorBoundary>
  );
};

export default MainLayout;
