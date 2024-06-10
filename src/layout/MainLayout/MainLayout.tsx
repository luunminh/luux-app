import { CustomErrorBoundary, Navbar } from '@components';
import { AuthContainer } from '@components/startup';
import appConfigs from '@config';
import { LoadingGlobalContainer } from '@containers';
import { AppShell } from '@mantine/core';
import { PropsWithChildren } from 'react';
import useLayoutProps from './useLayoutProps';

type MainLayoutProps = PropsWithChildren;

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isHideNav } = useLayoutProps();

  return (
    <CustomErrorBoundary showErrorMessage>
      <AppShell
        header={{
          collapsed: isHideNav,
          height: appConfigs.NAVBAR_HEIGHT,
        }}
      >
        <AppShell.Header zIndex={1300}>
          <Navbar />
        </AppShell.Header>
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
