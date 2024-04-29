import { FormCore } from '@components';
import { ActionIcon, Button, Divider, Flex, Tooltip } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { IoMenu as MenuIcon } from 'react-icons/io5';
import { LuRedo2 as RedoIcon, LuUndo2 as UndoIcon } from 'react-icons/lu';
import { IDesignForm, IDesignFormKey } from '../../DesignForm.helpers';
import { AvatarGroup } from './components';

import { useWorkHistory } from '../../hooks';
import './design-form.header.styles.scss';

type Props = {
  form: UseFormReturn<IDesignForm>;
  workHistory: ReturnType<typeof useWorkHistory>;
  hasPast: boolean;
  hasFuture: boolean;
};

const DesignFormHeader = ({ form, workHistory, hasPast, hasFuture }: Props) => {
  const { goToPast, goToFuture } = workHistory;
  const { control } = form;
  return (
    <Flex
      py={12}
      px={16}
      h="100%"
      align="center"
      justify="space-between"
      style={{
        backgroundColor: '#0093E9',
        backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
      }}
    >
      <Flex gap={16}>
        <Tooltip label="Menu">
          <ActionIcon variant="subtle" size="xl">
            <MenuIcon size={26} color="white" />
          </ActionIcon>
        </Tooltip>
        <Divider orientation="vertical" c="white" />
        <Tooltip label="Undo">
          <ActionIcon variant="subtle" size="xl" disabled={!hasPast} onClick={goToPast}>
            <UndoIcon size={22} color={hasPast ? 'white' : 'rgba(255,255,255,0.3)'} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Redo">
          <ActionIcon variant="subtle" size="xl" disabled={!hasFuture} onClick={goToFuture}>
            <RedoIcon size={22} color={hasFuture ? 'white' : 'rgba(255,255,255,0.3)'} />
          </ActionIcon>
        </Tooltip>
      </Flex>
      <Flex gap={16} align="center" justify="end">
        <FormCore.Input
          className="design-form__name"
          width="auto"
          control={control}
          autoComplete="off"
          placeholder="Untitled design"
          name={IDesignFormKey.NAME}
        />
        <AvatarGroup form={form} />
        <Button
          style={{
            width: 100,
          }}
          variant="gradient"
        >
          Share
        </Button>
      </Flex>
    </Flex>
  );
};

export default DesignFormHeader;
