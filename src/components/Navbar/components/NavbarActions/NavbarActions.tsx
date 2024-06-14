import { getFullName, getStandForName, isEmpty } from '@core/common';
import { useGetScreenSizeList, useLogout, useProfile } from '@core/queries';
import {
  ActionIcon,
  Avatar,
  Button,
  Flex,
  Menu,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { useCreateDesign } from '@modules/design/queries';
import { DEFAULT_DESIGN } from '@modules/design/view/DesignForm';
import { useState } from 'react';

import { IoIosAdd as AddIcon } from 'react-icons/io';
import { IoLogOutOutline as LogoutIcon, IoSettingsOutline as SettingIcon } from 'react-icons/io5';
import { RiLockPasswordLine as LockIcon } from 'react-icons/ri';
import ChangePasswordModal from './NavbarActions.password';
import UpdateUserModal from './NavbarActions.update-profile';

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
  const handleAddNewDesign = () => {
    modals.open({
      title: <Title order={4}>Create New Design</Title>,
      size: 'md',
      withCloseButton: true,
      children: <AddDesignModal />,
      overlayProps: { backgroundOpacity: 0.5, blur: 4 },
    });
  };

  return (
    <Button onClick={handleAddNewDesign} leftSection={<AddIcon size={22} />} variant="gradient">
      Create new design
    </Button>
  );
};

const AddDesignModal = () => {
  const {
    profile: { id },
  } = useProfile();
  const [screenSize, setScreenSize] = useState('');

  const { screenSizeList, isFetching: isFetchingScreenSize } = useGetScreenSizeList({
    enabled: true,
  });

  const { onCreateDesign, isLoading: isCreatingDesign } = useCreateDesign({
    onSuccess: ({ data }) => {
      window.open(`/app/design/${data}`, '_blank');
    },
  });

  const handleCreateDesign = () => {
    const data = DEFAULT_DESIGN({ screenSizeId: screenSize, userId: id });

    onCreateDesign({ ...data, metadata: data.metadata });
  };

  return (
    <Stack gap={16}>
      <Select
        clearable
        label="Select Screen Size"
        placeholder="Screen size"
        value={screenSize}
        disabled={isFetchingScreenSize}
        data={screenSizeList.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        onChange={(value) => setScreenSize(value)}
      />
      <Flex justify="end" gap={16} mt={16}>
        <Button variant="outline" disabled={isCreatingDesign} onClick={modals.closeAll}>
          Cancel
        </Button>
        <Button
          loading={isCreatingDesign}
          onClick={handleCreateDesign}
          disabled={isEmpty(screenSize)}
          variant="gradient"
        >
          Create
        </Button>
      </Flex>
    </Stack>
  );
};

NavbarActions.Menu = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { profile } = useProfile();

  const fullName = getFullName(profile);

  const handleChangePassword = () => {
    modals.open({
      title: <Title order={4}>Change Password</Title>,
      size: 'md',
      withCloseButton: true,
      children: <NavbarActions.ChangePassword />,
      overlayProps: { backgroundOpacity: 0.5, blur: 4 },
    });
  };

  const handleUpdateProfile = () => {
    modals.open({
      title: <Title order={4}>Update Profile</Title>,
      size: 'lg',
      withCloseButton: true,
      children: <NavbarActions.UpdateProfile />,
      overlayProps: { backgroundOpacity: 0.5, blur: 4 },
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { onLogout } = useLogout();

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
          {getStandForName(profile)}
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
        <Menu.Item leftSection={<SettingIcon />} onClick={handleUpdateProfile}>
          Update Profile
        </Menu.Item>
        <Menu.Item leftSection={<LockIcon />} onClick={handleChangePassword}>
          Change password
        </Menu.Item>
        <Menu.Item leftSection={<LogoutIcon />} onClick={onLogout}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

NavbarActions.ChangePassword = ChangePasswordModal;
NavbarActions.UpdateProfile = UpdateUserModal;
export default NavbarActions;
