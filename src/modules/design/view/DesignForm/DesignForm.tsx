import { isEmpty } from '@core/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppShell, Stack } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IDesignForm, designFormInitialValues, designFormSchema } from './DesignForm.helpers';
import { Board, DesignFormHeader } from './components';
import { useTransformer, useWorkHistory } from './hooks';
import { IDesignContent } from './types';

const HEADER_HEIGHT = 56;
const SIDEBAR_WIDTH = 430;

const DesignForm = () => {
  const [past, setPast] = useState<IDesignContent[][]>([]);
  const [future, setFuture] = useState<IDesignContent[][]>([]);

  const hasPast = !isEmpty(past);
  const hasFuture = !isEmpty(future);

  const transformer = useTransformer();
  const workHistory = useWorkHistory({ past, future, setPast, setFuture });

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
      navbar={{
        breakpoint: 'md',
        width: SIDEBAR_WIDTH,
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
      <AppShell.Navbar>
        <div>Sidebar</div>
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack align="center" justify="center" h="80vh">
          <DesignForm.Board pageNumber={1} transformer={transformer} workHistory={workHistory} />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};

DesignForm.Header = DesignFormHeader;
DesignForm.Board = Board;

export default DesignForm;
