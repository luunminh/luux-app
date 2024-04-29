import { COLOR_CODE } from '@core/common';
import { ActionIcon, Button, Menu, Tooltip } from '@mantine/core';
import { Node, NodeConfig } from 'konva/lib/Node';
import { BiDuplicate } from 'react-icons/bi';
import { BsLayerBackward, BsLayerForward } from 'react-icons/bs';
import { FaLock, FaLockOpen, FaRegComment } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { IoCopyOutline, IoTrash } from 'react-icons/io5';
import { LuClipboardPaste } from 'react-icons/lu';
import { TbArrowsDown, TbArrowsUp } from 'react-icons/tb';
import { useShape } from '../../hooks';

type Props = {
  selectedItems: Node<NodeConfig>[];
  clearSelection: () => void;
};

const BoardMenuItem = ({ selectedItems, clearSelection }: Props) => {
  const { removeShapes, updateShapes } = useShape();

  const isShowLockButton = selectedItems.length === 1;
  const isLocked = selectedItems[0]?.attrs.locked;

  const handleRemoveShapes = () => {
    removeShapes(selectedItems.map((item) => item.id()));
    clearSelection();
  };

  const handleLockShape = () => {
    const updatedShapes = selectedItems.map((item) => ({
      ...item,
      id: item.id(),
      attrs: {
        ...item.attrs,
        locked: !item.attrs.locked,
      },
    }));

    updateShapes(
      selectedItems.map((item) => item.id()),
      updatedShapes,
    );
    clearSelection();
  };

  return (
    <Button.Group
      bg="white"
      style={{
        borderRadius: 8,
      }}
    >
      <Menu width={250}>
        <Menu.Target>
          <Tooltip label="Menu" withArrow>
            <ActionIcon
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              variant="light"
              size="xl"
              aria-label="Menu"
            >
              <HiMenu size={18} />
            </ActionIcon>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label c="blue">Actions</Menu.Label>
          <Menu.Divider />
          <Menu.Item color="blue" c={COLOR_CODE.TEXT_CONTROL} leftSection={<IoCopyOutline />}>
            Copy
          </Menu.Item>
          <Menu.Item color="blue" c={COLOR_CODE.TEXT_CONTROL} leftSection={<LuClipboardPaste />}>
            Paste
          </Menu.Item>
          <Menu.Item color="blue" c={COLOR_CODE.TEXT_CONTROL} leftSection={<BiDuplicate />}>
            Duplicate
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label c="blue">Layer</Menu.Label>
          <Menu.Item color="blue" c={COLOR_CODE.TEXT_CONTROL} leftSection={<BsLayerForward />}>
            Bring forward
          </Menu.Item>
          <Menu.Item color="blue" c={COLOR_CODE.TEXT_CONTROL} leftSection={<TbArrowsUp />}>
            Bring to front
          </Menu.Item>
          <Menu.Item color="blue" c={COLOR_CODE.TEXT_CONTROL} leftSection={<BsLayerBackward />}>
            Bring backward
          </Menu.Item>
          <Menu.Item color="blue" c={COLOR_CODE.TEXT_CONTROL} leftSection={<TbArrowsDown />}>
            Bring to back
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Tooltip label="Delete" withArrow>
        <ActionIcon
          onClick={handleRemoveShapes}
          variant="light"
          aria-label="Delete"
          size="xl"
          style={{
            borderRadius: 0,
          }}
        >
          <IoTrash />
        </ActionIcon>
      </Tooltip>
      {isShowLockButton && (
        <Tooltip label={isLocked ? 'Unlock' : 'Lock'} withArrow onClick={handleLockShape}>
          <ActionIcon
            style={{
              borderRadius: 0,
            }}
            variant="light"
            size="xl"
          >
            {isLocked ? <FaLockOpen size={14} /> : <FaLock />}
          </ActionIcon>
        </Tooltip>
      )}
      <Tooltip label="Comment" withArrow>
        <ActionIcon
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          variant="light"
          size="xl"
          aria-label="Comment"
        >
          <FaRegComment size={14} />
        </ActionIcon>
      </Tooltip>
    </Button.Group>
  );
};

export default BoardMenuItem;
