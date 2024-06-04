import { COLOR_CODE, getFullName, getStandForName } from '@core/common';
import { useProfile } from '@core/queries';
import { Avatar, Flex, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IGetDesignUser } from '@modules/design/queries';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import _ from 'lodash';
import { GoDotFill } from 'react-icons/go';

type AvatarItemsProps = {
  user: IGetDesignUser;
  isOnline?: boolean;
};
const AvatarItem = ({ user, isOnline = false }: AvatarItemsProps) => {
  return (
    <Tooltip
      color="white"
      label={
        <Group c={'gray'} p={8} align="start">
          <Avatar src="image.png" size="lg" radius="xl">
            {getStandForName(user)}
          </Avatar>
          <Stack gap={0}>
            <Title order={4}>{getFullName(user)}</Title>
            <Text>{user.email}</Text>
          </Stack>
          <Flex align="center" mt={2} gap={4}>
            Status:{' '}
            <GoDotFill size={18} color={isOnline ? COLOR_CODE.SUCCESS : COLOR_CODE.DANGER} />
          </Flex>
        </Group>
      }
      withArrow
    >
      <Avatar
        src="image.png"
        radius="xl"
        style={
          isOnline && {
            boxShadow: `0 0 0 4px ${COLOR_CODE.PRIMARY}`,
          }
        }
      >
        {getStandForName(user)}
      </Avatar>
    </Tooltip>
  );
};

export const AvatarGroup = () => {
  const {
    data: { users = [] },
    onlineUserIds,
  } = useDesignStore();

  const { profile } = useProfile();

  const isOnline = (id: string) => onlineUserIds?.includes(id);
  const sortedUsers = _.orderBy(
    users,
    [(user) => user.id === profile?.id, (user) => onlineUserIds.includes(user.id)],
    ['desc', 'desc'],
  );

  const showingUsers = sortedUsers.slice(0, 4);
  const hiddenUsers = sortedUsers.slice(4);

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {showingUsers.map((user) => (
          <AvatarItem key={user.id} user={user} isOnline={isOnline(user.id)} />
        ))}
        {hiddenUsers.length > 0 && (
          <Tooltip
            label={
              <>
                {hiddenUsers.map((user) => (
                  <div key={user.id}>{getFullName(user)} </div>
                ))}
              </>
            }
            withArrow
          >
            <Avatar radius="xl">+{hiddenUsers.length}</Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Tooltip.Group>
  );
};

export default AvatarGroup;
