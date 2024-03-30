import { Navbar } from '@components';
import appConfigs from '@config';
import { LoadingGlobalContainer } from '@containers';
import { ToastService } from '@core/common';
import { CustomErrorBoundary } from '@core/components';
import { AppShell, Button, Flex } from '@mantine/core';
import { PropsWithChildren } from 'react';
import useLayoutProps from './useLayoutProps';

type MainLayoutProps = PropsWithChildren;

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isHideNav, isHideSidebar, isNotRequiredAuth } = useLayoutProps();

  return (
    <CustomErrorBoundary showErrorMessage>
      <AppShell
        padding="sm"
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
          {/* {children} */}
          <Flex gap="sm">
            <Button onClick={() => ToastService.success('Toast success')}>Toast success</Button>
            <Button onClick={() => ToastService.error('Toast error')}>Toast error</Button>
            <Button onClick={() => ToastService.warning('Toast warning')}>Toast warning</Button>
            <Button onClick={() => ToastService.info('Toast info')}>Toast info</Button>
          </Flex>
          <LoadingGlobalContainer />
        </AppShell.Main>
      </AppShell>
    </CustomErrorBoundary>
  );
};

export default MainLayout;
