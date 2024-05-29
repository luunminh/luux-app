import { LoadingContainer } from '@components';
import { LoadingGlobalContainer } from '@containers';
import { CommonQueryKey, isEmpty, useComponentDidMount } from '@core/common';
import { useGetScreenSizeList } from '@core/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppShell, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { IDesignForm, designFormInitialValues, designFormSchema } from './DesignForm.helpers';
import { Board, ConfigurationAside, DesignFormHeader, ElementSidebar } from './components';
import { PageSelection } from './components/PageSelection';
import { useTransformer, useWorkHistory } from './hooks';
import { useDesignStore } from './store';
import { IDesignContent } from './types';

export const ASIDE_WIDTH = 350;
export const HEADER_HEIGHT = 56;
export const SIDEBAR_WIDTH = 430;

const MIN_SCALE = 1;
const MAX_SCALE = 5;

const DesignForm = () => {
  const [sidebarOpened, { toggle: toggledSidebar }] = useDisclosure(true);
  const [query] = useSearchParams();
  const { selectedPage, isExporting } = useDesignStore();

  const screenSizeId = query.get(CommonQueryKey.SCREEN_SIZE_ID);

  const {
    screenSizeList,
    isFetching: isFetchingScreenSize,
    setParams,
  } = useGetScreenSizeList({
    enabled: !isEmpty(screenSizeId),
  });

  const screenSize = screenSizeList[0];

  useComponentDidMount(() => {
    setParams((prev) => ({ ...prev, screenSizeIds: [screenSizeId] }));
  });

  const [past, setPast] = useState<IDesignContent[][]>([]);
  const [future, setFuture] = useState<IDesignContent[][]>([]);

  const hasPast = !isEmpty(past);
  const hasFuture = !isEmpty(future);

  const transformer = useTransformer();
  const workHistory = useWorkHistory({ past, future, setPast, setFuture });

  const { selectedItems } = useDesignStore();

  const form = useForm<IDesignForm>({
    defaultValues: designFormInitialValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver<any>(designFormSchema),
  });

  const isLoading = isFetchingScreenSize || isEmpty(screenSize);

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <TransformWrapper
      minScale={MIN_SCALE}
      maxScale={MAX_SCALE}
      centerOnInit
      centerZoomedOut
      limitToBounds
      disablePadding
      wheel={{
        step: 100,
        wheelDisabled: true,
      }}
      doubleClick={{
        disabled: true,
      }}
      panning={{
        disabled: true,
      }}
    >
      <AppShell
        withBorder={false}
        header={{
          height: HEADER_HEIGHT,
        }}
        navbar={{
          width: SIDEBAR_WIDTH,
          breakpoint: 'sm',
          collapsed: { desktop: !sidebarOpened },
        }}
        aside={{
          breakpoint: 'md',
          width: ASIDE_WIDTH,
          collapsed: {
            mobile: true,
            desktop: isEmpty(selectedItems),
          },
        }}
      >
        <AppShell.Header>
          <DesignForm.Header
            form={form}
            hasPast={hasPast}
            hasFuture={hasFuture}
            workHistory={workHistory}
            sidebarState={{
              opened: sidebarOpened,
              toggle: toggledSidebar,
            }}
          />
        </AppShell.Header>
        <AppShell.Navbar withBorder>
          <ElementSidebar />
        </AppShell.Navbar>
        <AppShell.Main
          className="board-wrapper"
          style={{
            padding: 0,
            marginLeft: sidebarOpened ? -SIDEBAR_WIDTH / 2 : 0,
            transition: 'margin-left 0.3s',
          }}
        >
          <TransformComponent
            wrapperStyle={{
              height: '100vh',
            }}
          >
            <Stack w="100vw" h="100%">
              <Stack align="center" justify="center" h="80vh">
                <DesignForm.Board
                  pageNumber={selectedPage}
                  screenSize={screenSize}
                  transformer={transformer}
                  workHistory={workHistory}
                />
              </Stack>
            </Stack>
          </TransformComponent>
          <PageSelection.Trigger />

          {isExporting && <LoadingGlobalContainer />}
        </AppShell.Main>
        <AppShell.Aside withBorder>
          <DesignForm.Aside transformer={transformer} />
        </AppShell.Aside>
      </AppShell>
    </TransformWrapper>
  );
};

DesignForm.Board = Board;
DesignForm.Header = DesignFormHeader;
DesignForm.Aside = ConfigurationAside;

export default DesignForm;
