import { Navigator, getFullName } from '@core/common';
import { useProfile } from '@core/queries';
import { ActionIcon, Avatar, Button, Flex, Menu, Stack, Text, Title, Tooltip } from '@mantine/core';

import { IoIosAdd as AddIcon } from 'react-icons/io';
import { IoLogOutOutline as LogoutIcon, IoSettingsOutline as SettingIcon } from 'react-icons/io5';
import { RiLockPasswordLine as LockIcon } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const NavbarActions = () => {
  return (
    <Flex align="center" h="100%" gap="md">
      <NavbarActions.Settings />
      <NavbarActions.CreateDesign />
      <NavbarActions.Menu />
    </Flex>
  );
};

NavbarActions.Settings = () => {
  const handleOpenSettings = () => {};

  return (
    <Tooltip label="Settings" radius="sm" withArrow>
      <ActionIcon
        color="dark"
        aria-label="Settings"
        variant="transparent"
        onClick={handleOpenSettings}
      >
        <SettingIcon size={24} />
      </ActionIcon>
    </Tooltip>
  );
};

NavbarActions.CreateDesign = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const portal = Navigator.getCurrentPortalUrl();

  const handleCreateNewDesign = () => {
    navigate(`${portal}/design/add`);
  };

  return (
    <Button onClick={handleCreateNewDesign} leftSection={<AddIcon size={22} />} variant="gradient">
      Create new design
    </Button>
  );
};

NavbarActions.Menu = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { profile } = useProfile();

  const fullName = getFullName(profile);

  return (
    <Menu width={350} position="bottom" shadow="md">
      <Menu.Target>
        <Avatar
          alt={fullName}
          radius="xl"
          style={{
            cursor: 'pointer',
          }}
        >
          ML
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <Flex gap="md" align="center">
            <Avatar alt={fullName} radius="xl" size="lg">
              ML
            </Avatar>
            <Stack gap={0}>
              <Title order={4}>{fullName}</Title>
              <Text size="xs">{profile?.email}</Text>
            </Stack>
          </Flex>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<SettingIcon />}>Settings</Menu.Item>
        <Menu.Item leftSection={<LockIcon />}>Change password</Menu.Item>
        <Menu.Item leftSection={<LogoutIcon />}>Log out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarActions;
