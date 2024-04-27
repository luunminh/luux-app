import { yupResolver } from '@hookform/resolvers/yup';
import { AppShell, Stack } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IDesignForm, designFormInitialValues, designFormSchema } from './DesignForm.helpers';
import { Board } from './components';
import DesignFormHeader from './components/Header/DesignForm.header';

const HEADER_HEIGHT = 56;

const DesignForm = () => {
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
    >
      <AppShell.Header>
        <DesignForm.Header form={form} />
      </AppShell.Header>
      <AppShell.Main>
        <Stack align="center" justify="center" h="80vh">
          <Board pageNumber={1} />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};

DesignForm.Header = DesignFormHeader;

export default DesignForm;
