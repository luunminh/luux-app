import { socketService } from '@core/common';
import { ActionIcon, Burger, Divider, Flex, TextInput, Tooltip } from '@mantine/core';
import { LuRedo2 as RedoIcon, LuUndo2 as UndoIcon } from 'react-icons/lu';
import { useWorkHistory } from '../../hooks';
import { useDesignStore } from '../../store';
import { AvatarGroup, DesignMenu } from './components';

import './design-form.header.styles.scss';

type Props = {
  workHistory: ReturnType<typeof useWorkHistory>;
  hasPast: boolean;
  hasFuture: boolean;
  sidebarState: {
    opened: boolean;
    toggle: () => void;
  };
};

const DesignFormHeader = ({ workHistory, hasPast, hasFuture, sidebarState }: Props) => {
  const { goToPast, goToFuture } = workHistory;
  const { data, onSetData } = useDesignStore();

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
          <Burger
            opened={sidebarState.opened}
            onClick={sidebarState.toggle}
            color="#FFF"
            size="sm"
            mt={8}
          />
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
        <TextInput
          className="design-form__name"
          width="auto"
          defaultValue={data.title}
          value={data.title}
          onChange={(e) => onSetData({ ...data, title: e.target.value })}
          onBlur={(e) => {
            onSetData({ ...data, title: e.target.value });
            socketService.editDesign({ ...data, title: e.target.value });
          }}
          autoComplete="off"
          placeholder="Untitled design"
        />
        <AvatarGroup />
        <DesignMenu />
      </Flex>
    </Flex>
  );
};

export default DesignFormHeader;
