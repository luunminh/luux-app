import { ActionIcon, Avatar, Button, Flex, Menu, Stack, Text, Title, Tooltip } from '@mantine/core';

import { IoIosAdd as AddIcon } from 'react-icons/io';
import { IoLogOutOutline as LogoutIcon, IoSettingsOutline as SettingIcon } from 'react-icons/io5';
import { RiLockPasswordLine as LockIcon } from 'react-icons/ri';

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
  const handleCreateNewDesign = () => {};

  return (
    <Button onClick={handleCreateNewDesign} leftSection={<AddIcon size={22} />} variant="gradient">
      Create new design
    </Button>
  );
};

NavbarActions.Menu = () => {
  // TODO: Implement menu w user profile, settings, etc.

  return (
    <Menu width={350} position="bottom" shadow="md">
      <Menu.Target>
        <Avatar
          alt="minh luu"
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
            <Avatar alt="minh luu" radius="xl" size="lg">
              ML
            </Avatar>
            <Stack gap={0}>
              <Title order={4}>Minh Luu</Title>
              <Text size="xs">minh_luu@datahouse.com</Text>
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
