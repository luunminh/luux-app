import { COLOR_CODE, Callback, getFullName, getStandForName } from '@core/common';
import { useProfile } from '@core/queries';
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Group,
  Loader,
  Menu,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDesignData } from '@modules/design/view/DesignForm/hooks';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { HiOutlinePresentationChartBar } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { IoAdd, IoShareSocialSharp } from 'react-icons/io5';
import { LuDownload } from 'react-icons/lu';
import { MdOutlineLink } from 'react-icons/md';
import { DownloadDesign, LinkAccess, PeopleAccess } from './components';

enum MenuItemOptionEnum {
  ACCESS = 'access',
  DOWNLOAD = 'download',
  PRESENT = 'present',
  PUBLIC_LINK = 'public_link',
  SHARE_SOCIAL = 'share_social',
}

const DesignMenu = () => {
  const { profile } = useProfile();

  const [selectedItem, setSelectedItem] = useState<MenuItemOptionEnum>(null);

  const handleBackToMainMenu = () => setSelectedItem(null);

  const renderMenuContent = useMemo(() => {
    switch (selectedItem) {
      case MenuItemOptionEnum.DOWNLOAD:
        return <DownloadDesign onBack={handleBackToMainMenu} />;
      case MenuItemOptionEnum.ACCESS:
        return <PeopleAccess onBack={handleBackToMainMenu} />;

      default:
        return (
          <Stack gap={16} p={16}>
            <Title order={5}>Share this design</Title>
            {/* people w access */}
            <PeopleWithAccess onOpenAccessMenu={() => setSelectedItem(MenuItemOptionEnum.ACCESS)} />

            {/* link */}
            <LinkAccess />
            <Divider />

            {/* more */}
            <Group gap={0}>
              <Menu.Item
                leftSection={<LuDownload size={16} />}
                rightSection={<IoIosArrowForward size={16} />}
                onClick={() => setSelectedItem(MenuItemOptionEnum.DOWNLOAD)}
              >
                Download
              </Menu.Item>
              <Menu.Item disabled leftSection={<HiOutlinePresentationChartBar size={16} />}>
                Present
              </Menu.Item>
              <Menu.Item disabled leftSection={<MdOutlineLink size={16} />}>
                Public Link
              </Menu.Item>
              <Menu.Item disabled leftSection={<IoShareSocialSharp size={16} />}>
                Share on social
              </Menu.Item>
            </Group>
          </Stack>
        );
    }
  }, [profile, selectedItem]);

  return (
    <Menu closeOnClickOutside={false} closeOnItemClick={false}>
      <Menu.Target>
        <Button
          style={{
            width: 100,
          }}
          variant="gradient"
        >
          Share
        </Button>
      </Menu.Target>
      <Menu.Dropdown w={416}>{renderMenuContent || <Loader />}</Menu.Dropdown>
    </Menu>
  );
};

const PeopleWithAccess = ({ onOpenAccessMenu }: { onOpenAccessMenu: Callback }) => {
  const {
    data: { users = [] },
    onlineUserIds,
  } = useDesignStore();

  const { hasEditingPermission } = useDesignData();

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
    <Stack>
      <Flex align="center">
        <Text size="xs" style={{ fontWeight: 500 }}>
          People with access
        </Text>
        {hasEditingPermission && (
          <Button
            style={{ height: 22 }}
            size="xs"
            variant="transparent"
            c={COLOR_CODE.SUCCESS}
            onClick={() => onOpenAccessMenu()}
          >
            Edit
          </Button>
        )}
      </Flex>
      <Avatar.Group>
        {showingUsers.map((user) => (
          <Tooltip key={user.id} label={getFullName(user)}>
            <Avatar
              style={isOnline && { boxShadow: `0 0 0 2px ${COLOR_CODE.PRIMARY}` }}
              src="image.png"
            >
              {getStandForName(user)}
            </Avatar>
          </Tooltip>
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
        {hasEditingPermission && (
          <Tooltip label="Add People" withArrow>
            <Avatar onClick={() => onOpenAccessMenu()}>
              <IoAdd />
            </Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Stack>
  );
};

export default DesignMenu;
