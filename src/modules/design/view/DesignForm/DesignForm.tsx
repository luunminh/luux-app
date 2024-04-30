import { isEmpty } from '@core/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppShell, Stack } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { IDesignForm, designFormInitialValues, designFormSchema } from './DesignForm.helpers';
import { Board, ConfigurationAside, DesignFormHeader } from './components';
import { useTransformer, useWorkHistory } from './hooks';
import { useDesignStore } from './store';
import { IDesignContent } from './types';

export const ASIDE_WIDTH = 350;
export const HEADER_HEIGHT = 56;
export const SIDEBAR_WIDTH = 430;

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;

const DesignForm = () => {
  const [past, setPast] = useState<IDesignContent[][]>([]);
  const [future, setFuture] = useState<IDesignContent[][]>([]);

  const hasPast = !isEmpty(past);
  const hasFuture = !isEmpty(future);

  const transformer = useTransformer();
  const workHistory = useWorkHistory({ past, future, setPast, setFuture });

  const { isSelectedItems } = useDesignStore();

  const form = useForm<IDesignForm>({
    defaultValues: designFormInitialValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver<any>(designFormSchema),
  });

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
        aside={{
          breakpoint: 'md',
          width: ASIDE_WIDTH,
          collapsed: {
            mobile: true,
            desktop: !isSelectedItems,
          },
        }}
      >
        <AppShell.Header>
          <DesignForm.Header
            form={form}
            hasPast={hasPast}
            hasFuture={hasFuture}
            workHistory={workHistory}
          />
        </AppShell.Header>
        <AppShell.Main
          className="board-wrapper"
          style={{
            padding: 0,
          }}
        >
          <TransformComponent
            wrapperStyle={{
              width: '100%',
              height: '100vh',
            }}
          >
            <Stack w="100vw" h="100%">
              <Stack align="center" justify="center" h="80vh">
                <DesignForm.Board
                  pageNumber={1}
                  transformer={transformer}
                  workHistory={workHistory}
                />
              </Stack>
            </Stack>
          </TransformComponent>
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
