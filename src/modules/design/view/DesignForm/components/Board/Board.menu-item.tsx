import { Button, Menu } from '@mantine/core';
import { Node, NodeConfig } from 'konva/lib/Node';
import { BiDuplicate } from 'react-icons/bi';
import { BsLayerBackward, BsLayerForward } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { IoCopyOutline, IoMenuOutline, IoTrash } from 'react-icons/io5';
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
          <Button size="sm" variant="outline" leftSection={<IoMenuOutline />}>
            Menu
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Actions</Menu.Label>
          <Menu.Divider />
          <Menu.Item leftSection={<IoCopyOutline />}>Copy</Menu.Item>
          <Menu.Item leftSection={<LuClipboardPaste />}>Paste</Menu.Item>
          <Menu.Item leftSection={<BiDuplicate />}>Duplicate</Menu.Item>
          <Menu.Divider />
          <Menu.Label>Layer</Menu.Label>
          <Menu.Item leftSection={<BsLayerForward />}>Bring forward</Menu.Item>
          <Menu.Item leftSection={<TbArrowsUp />}>Bring to front</Menu.Item>
          <Menu.Item leftSection={<BsLayerBackward />}>Bring backward</Menu.Item>
          <Menu.Item leftSection={<TbArrowsDown />}>Bring to back</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Button size="sm" onClick={handleRemoveShapes} variant="outline" leftSection={<IoTrash />}>
        Delete
      </Button>
      <Button size="sm" variant="outline" leftSection={<FaRegComment />}>
        Comment
      </Button>
    </Button.Group>
  );
};

export default BoardMenuItem;
