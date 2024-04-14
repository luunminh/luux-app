import { Navbar } from '@components';
import appConfigs from '@config';
import { LoadingGlobalContainer } from '@containers';
import { CustomErrorBoundary } from '@core/components';
import { AppShell } from '@mantine/core';
import { PropsWithChildren } from 'react';
import useLayoutProps from './useLayoutProps';

type MainLayoutProps = PropsWithChildren;

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isHideNav, isHideSidebar, isNotRequiredAuth } = useLayoutProps();

  return (
    <CustomErrorBoundary showErrorMessage>
      <AppShell
        // padding="sm"
        header={{
          collapsed: isHideNav,
          height: appConfigs.NAVBAR_HEIGHT,
        }}
        navbar={{
          collapsed: {
            mobile: isHideSidebar,
            desktop: isHideSidebar,
          },
          breakpoint: 'md',
          width: appConfigs.SIDEBAR_WIDTH,
        }}
      >
        <AppShell.Header>
          <Navbar />
        </AppShell.Header>
        <AppShell.Navbar />

        <AppShell.Main>
          {children}

          <LoadingGlobalContainer />
        </AppShell.Main>
      </AppShell>
    </CustomErrorBoundary>
  );
};

export default MainLayout;
