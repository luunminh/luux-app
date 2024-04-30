import { isEmpty } from '@core/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppShell, Stack } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IDesignForm, designFormInitialValues, designFormSchema } from './DesignForm.helpers';
import { Board, ConfigurationAside, DesignFormHeader } from './components';
import { useTransformer, useWorkHistory } from './hooks';
import { useDesignStore } from './store';
import { IDesignContent } from './types';

export const ASIDE_WIDTH = 350;
export const HEADER_HEIGHT = 56;
export const SIDEBAR_WIDTH = 430;

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
      <AppShell.Main className="board-wrapper">
        <Stack align="center" justify="center" h="80vh">
          <DesignForm.Board pageNumber={1} transformer={transformer} workHistory={workHistory} />
        </Stack>
      </AppShell.Main>
      <AppShell.Aside>
        <DesignForm.Aside transformer={transformer} />
      </AppShell.Aside>
    </AppShell>
  );
};

DesignForm.Board = Board;
DesignForm.Header = DesignFormHeader;
DesignForm.Aside = ConfigurationAside;

export default DesignForm;
