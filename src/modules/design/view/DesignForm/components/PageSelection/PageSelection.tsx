import { COLOR_CODE } from '@core/common';
import { ActionIcon, Drawer, Flex, Menu, Paper, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoIosArrowUp, IoIosMore } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import { usePage } from '../../hooks';
import { useDesignStore } from '../../store';

type PageItemProps = {
  pageIdx: number;
};
const PageItem = ({ pageIdx }: PageItemProps) => {
  const { selectedPage, onSetSelectedPage } = useDesignStore();

  const isSelected = selectedPage === pageIdx;

  const handleSelectPage = () => {
    if (!isSelected) onSetSelectedPage(pageIdx);
  };

  return (
    <Tooltip label={`Page ${pageIdx}`} withArrow>
      <Paper
        w={120}
        h={64}
        shadow="xs"
        p="md"
        component="button"
        style={{
          flex: '0 0 120px',
          position: 'relative',
          cursor: 'pointer',
          border: isSelected ? `2px solid ${COLOR_CODE.PRIMARY}` : COLOR_CODE.BORDER_DEFAULT,
        }}
        onClick={handleSelectPage}
      >
        <Text>Page {pageIdx}</Text>
        <MenuOptions />
      </Paper>
    </Tooltip>
  );
};

const Selection = () => {
  const { data } = useDesignStore();
  const { addNewPage } = usePage();
  const pages = data.length;

  return (
    <Flex gap={16} style={{ overflowX: 'scroll' }}>
      {Array.from({ length: pages }).map((_, idx) => (
        <PageItem key={idx} pageIdx={idx + 1} />
      ))}
      <Tooltip label="Add page" withArrow>
        <Paper
          h={64}
          w={120}
          shadow="xs"
          p="md"
          component="button"
          className="cmp-page-item"
          style={{
            cursor: 'pointer',
            border: COLOR_CODE.BORDER_DEFAULT,
          }}
          onClick={() => addNewPage()}
        >
          <IoAddOutline size={30} />
        </Paper>
      </Tooltip>
    </Flex>
  );
};

const Trigger = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        size="10%"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        position="bottom"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Selection />
      </Drawer>

      <Tooltip label="Select page">
        <ActionIcon
          style={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
          }}
          variant="light"
          size="lg"
          onClick={open}
        >
          <IoIosArrowUp size={24} />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

const MenuOptions = () => {
  const { removePage, selectedPage } = usePage();
  return (
    <Menu width={100} position="bottom" shadow="md">
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          color="gray"
          size="xs"
          style={{ position: 'absolute', top: '5px', right: '5px' }}
        >
          <IoIosMore size={12} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removePage(selectedPage);
          }}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default {
  Selection,
  Trigger,
};
