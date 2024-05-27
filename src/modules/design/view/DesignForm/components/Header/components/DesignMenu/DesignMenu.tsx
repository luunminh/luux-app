import { COLOR_CODE, getFullName, getStandForName } from '@core/common';
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
import { useMemo, useState } from 'react';
import { HiOutlinePresentationChartBar } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { IoAdd, IoShareSocialSharp } from 'react-icons/io5';
import { LuDownload } from 'react-icons/lu';
import { MdOutlineLink } from 'react-icons/md';
import { DownloadDesign, LinkAccess } from './components';

enum MenuItemOptionEnum {
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

      default:
        return (
          <Stack gap={16} p={16}>
            <Title order={5}>Share this design</Title>
            {/* people w access */}
            <Stack>
              <Flex align="center">
                <Text size="xs" style={{ fontWeight: 500 }}>
                  People with access
                </Text>
                <Button
                  style={{ height: 22 }}
                  size="xs"
                  variant="transparent"
                  c={COLOR_CODE.SUCCESS}
                >
                  Edit
                </Button>
              </Flex>
              <Avatar.Group>
                <Tooltip label={getFullName(profile)} withArrow>
                  <Avatar style={{ border: `1px solid ${COLOR_CODE.PRIMARY}` }} src="image.png">
                    {getStandForName(profile)}
                  </Avatar>
                </Tooltip>
                <Avatar src="image.png" />
                <Avatar src="image.png" />
                <Tooltip label="Add People" withArrow>
                  <Avatar>
                    <IoAdd />
                  </Avatar>
                </Tooltip>
              </Avatar.Group>
            </Stack>

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

export default DesignMenu;
