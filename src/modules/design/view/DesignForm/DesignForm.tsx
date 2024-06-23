import { LoadingContainer } from '@components';
import { isEmpty, useComponentDidMount, useComponentWillUnmount } from '@core/common';
import { useGetScreenSizeList } from '@core/queries';
import { AppShell, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useGetDesignById } from '@modules/design/queries';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { socketService } from 'src/service';
import { Board, ConfigurationAside, DesignFormHeader, ElementSidebar } from './components';
import { PageSelection } from './components/PageSelection';
import { useDesignData, useTransformer, useWorkHistory } from './hooks';
import { useDesignStore } from './store';
import { IDesignContent } from './types';

export const ASIDE_WIDTH = 350;
export const HEADER_HEIGHT = 56;
export const SIDEBAR_WIDTH = 430;

const MIN_SCALE = 1;
const MAX_SCALE = 5;

type Props = { screenSizeId: string };

const DesignForm = ({ screenSizeId }: Props) => {
  const { hasEditingPermission } = useDesignData();

  const [sidebarOpened, { toggle: toggledSidebar }] = useDisclosure(hasEditingPermission);
  const { selectedPage, isExporting } = useDesignStore();

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
          collapsed: { desktop: !sidebarOpened, mobile: true },
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
        <AppShell.Header zIndex={1300}>
          <DesignForm.Header
            hasPast={hasPast}
            hasFuture={hasFuture}
            workHistory={workHistory}
            sidebarState={{
              opened: sidebarOpened,
              toggle: toggledSidebar,
            }}
          />
        </AppShell.Header>
        <AppShell.Navbar withBorder className="cmp-design-form__sidebar">
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
              <Stack
                align="center"
                justify="center"
                h="80vh"
                style={{ pointerEvents: isExporting || !hasEditingPermission ? 'none' : 'auto' }}
              >
                <DesignForm.Board
                  pageNumber={selectedPage}
                  screenSize={screenSize}
                  transformer={transformer}
                  workHistory={workHistory}
                />
              </Stack>
            </Stack>
          </TransformComponent>

          {isExporting && <LoadingContainer />}
        </AppShell.Main>
        <AppShell.Aside withBorder className="cmp-design-form__aside">
          <DesignForm.Aside transformer={transformer} />
        </AppShell.Aside>
        <AppShell.Footer withBorder className="cmp-design-form__footer">
          <PageSelection.Footer />
        </AppShell.Footer>
      </AppShell>
    </TransformWrapper>
  );
};

export const DesignFormWrapper = () => {
  const { id } = useParams();
  const { designDetail, isLoadingDesignDetail } = useGetDesignById({ id });
  const { onSetData } = useDesignStore();

  useEffect(() => {
    if (designDetail) {
      onSetData(designDetail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designDetail]);

  useComponentWillUnmount(() => {
    socketService.leaveDesign({
      designId: id,
    });
  });

  if (isLoadingDesignDetail) {
    return <LoadingContainer />;
  }

  return <DesignForm screenSizeId={designDetail.screenSizeId} />;
};

DesignForm.Board = Board;
DesignForm.Header = DesignFormHeader;
DesignForm.Aside = ConfigurationAside;

export default DesignForm;
