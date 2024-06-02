import { COLOR_CODE, getFullName, getStandForName } from '@core/common';
import { useProfile } from '@core/queries';
import { Avatar, Flex, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IGetDesignUser } from '@modules/design/queries';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import { GoDotFill } from 'react-icons/go';

type Props = {};

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
            boxShadow: `0 0 0 5px ${COLOR_CODE.PRIMARY}`,
          }
        }
      >
        {getStandForName(user)}
      </Avatar>
    </Tooltip>
  );
};

export const AvatarGroup = () => {
  const { profile, loading } = useProfile();
  const {
    data: { users = [] },
  } = useDesignStore();

  if (loading) return null;

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {users.map((user) => (
          <AvatarItem key={user.id} user={user} />
        ))}
        <Tooltip
          label={
            <>
              <div>John Outcast</div>
              <div>Levi Capitan</div>
            </>
          }
          withArrow
        >
          <Avatar radius="xl">+5</Avatar>
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
};

export default AvatarGroup;
