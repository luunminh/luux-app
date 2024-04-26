import { ActionIcon, Button, Menu } from '@mantine/core';
import { Node, NodeConfig } from 'konva/lib/Node';
import { BiDuplicate } from 'react-icons/bi';
import { BsLayerBackward, BsLayerForward } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
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
  const { removeShapes } = useShape();

  const handleRemoveShapes = () => {
    removeShapes(selectedItems.map((item) => item.id()));
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
          <ActionIcon
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            variant="light"
            size="lg"
            aria-label="Menu"
          >
            <HiMenu size={18} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Actions</Menu.Label>
          <Menu.Divider />
          <Menu.Item color="blue" leftSection={<IoCopyOutline />}>
            Copy
          </Menu.Item>
          <Menu.Item color="blue" leftSection={<LuClipboardPaste />}>
            Paste
          </Menu.Item>
          <Menu.Item color="blue" leftSection={<BiDuplicate />}>
            Duplicate
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Layer</Menu.Label>
          <Menu.Item color="blue" leftSection={<BsLayerForward />}>
            Bring forward
          </Menu.Item>
          <Menu.Item color="blue" leftSection={<TbArrowsUp />}>
            Bring to front
          </Menu.Item>
          <Menu.Item color="blue" leftSection={<BsLayerBackward />}>
            Bring backward
          </Menu.Item>
          <Menu.Item color="blue" leftSection={<TbArrowsDown />}>
            Bring to back
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ActionIcon
        onClick={handleRemoveShapes}
        variant="light"
        aria-label="Copy"
        size="lg"
        style={{
          borderRadius: 0,
        }}
      >
        <IoTrash />
      </ActionIcon>
      <ActionIcon
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        variant="light"
        size="lg"
        aria-label="Comment"
      >
        <FaRegComment size={14} />
      </ActionIcon>
    </Button.Group>
  );
};

export default BoardMenuItem;
