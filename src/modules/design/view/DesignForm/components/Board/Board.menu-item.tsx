import { COLOR_CODE, getRandomId, isEmpty } from '@core/common';
import { ActionIcon, Button, Menu, Tooltip } from '@mantine/core';
import { Group } from 'konva/lib/Group';
import { Layer } from 'konva/lib/Layer';
import { Node, NodeConfig } from 'konva/lib/Node';
import { useState } from 'react';
import { BiDuplicate } from 'react-icons/bi';
import { BsLayerBackward, BsLayerForward } from 'react-icons/bs';
import {
  FaLock,
  FaLockOpen,
  FaLayerGroup as GroupIcon,
  FaObjectUngroup as UnGroupIcon,
} from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { IoCopyOutline, IoTrash } from 'react-icons/io5';
import { LuClipboardPaste } from 'react-icons/lu';
import { TbArrowsDown, TbArrowsUp } from 'react-icons/tb';
import { useDesignLS, useHotkeyFunc, useShape, useStage } from '../../hooks';
import { IShape } from '../../types';
type Props = {
  stage: ReturnType<typeof useStage>;
  selectedItems: Node<NodeConfig>[];
  clearSelection: () => void;
};

const BoardMenuItem = ({ selectedItems, clearSelection, stage }: Props) => {
  const { removeShapes, updateShapes, shapes } = useShape();
  const { stageRef } = stage;

  const { copyItems, pasteItems, duplicateItems } = useHotkeyFunc();

  const { getClipboard } = useDesignLS();
  const [clipboard, setClipboard] = useState<IShape[]>(getClipboard() || []);

  const isShowLockButton = selectedItems.length === 1;
  const isLocked = selectedItems[0]?.attrs.locked;
  const hasGroup = selectedItems.some((item) => !isEmpty(item.attrs?.group));

  const maxShapesZIndex = Math.max(...shapes.map((item) => item.attrs.layerIdx));
  const minShapesZIndex = Math.min(...shapes.map((item) => item.attrs.layerIdx));

  const handleRemoveShapes = () => {
    removeShapes(selectedItems.map((item) => item.id()));
    clearSelection();
  };

  const handleLockShape = () => {
    toggleLockStatus();
    clearSelection();
  };

  const handleBringFrontShapes = () => {
    updateLayerIndex(1, true);
    moveShapes('up');
  };

  const handleBringBackShapes = () => {
    updateLayerIndex(-1, true);
    moveShapes('down');
  };

  const handleBringToTop = () => {
    updateLayerIndex(maxShapesZIndex + 1);
    moveShapes('top');
  };

  const handleBringToBottom = () => {
    updateLayerIndex(minShapesZIndex);
    moveShapes('bottom');
  };

  const toggleLockStatus = () => {
    const updatedShapes = selectedItems.map((item) => ({
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
  };

  const updateLayerIndex = (newIndex: number, isAdd = false) => {
    const updatedShapes = selectedItems.map((item) => ({
      id: item.id(),
      attrs: {
        ...item.attrs,
        layerIdx: isAdd ? item.attrs?.layerIdx || 0 + newIndex : newIndex,
      },
    }));

    updateShapes(
      selectedItems.map((item) => item.id()),
      updatedShapes,
    );
  };

  const moveShapes = (direction: 'up' | 'down' | 'top' | 'bottom') => {
    let containerRef;
    if (hasGroup) {
      const groupRef = stageRef.current
        .getChildren()[0]
        .getChildren((node) => selectedItems.some((item) => item.attrs.group === node.id()))[0];

      switch (direction) {
        case 'up':
          groupRef.moveUp();
          break;
        case 'down':
          groupRef.moveDown();
          break;
        case 'top':
          groupRef.moveToTop();
          break;
        case 'bottom':
          groupRef.moveToBottom();
          break;
      }
      containerRef = groupRef as Group;
    } else {
      containerRef = stageRef.current.getChildren()[0] as Layer;
    }

    const selectedItemRefs = containerRef.getChildren((node) =>
      selectedItems.some((item) => item.id() === node.id()),
    );

    selectedItemRefs.forEach((item) => {
      switch (direction) {
        case 'up':
          item.moveUp();
          break;
        case 'down':
          item.moveDown();
          break;
        case 'top':
          item.moveToTop();
          break;
        case 'bottom':
          item.moveToBottom();
          break;
      }
    });
  };

  const handleGroupShapes = () => {
    const groupIds = getRandomId();
    const groupShapes = selectedItems.map((item) => ({
      id: item.id(),
      attrs: {
        ...item.attrs,
        group: groupIds,
      },
    }));

    updateShapes(
      selectedItems.map((item) => item.id()),
      groupShapes,
    );

    clearSelection();
  };

  const handleUnGroupShapes = () => {
    const unGroupShapes = selectedItems.map((item) => ({
      id: item.id(),
      attrs: {
        ...item.attrs,
        group: undefined,
      },
    }));

    updateShapes(
      selectedItems.map((item) => item.id()),
      unGroupShapes,
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
          <Menu.Item
            color="blue"
            c={COLOR_CODE.TEXT_CONTROL}
            onClick={() => copyItems(selectedItems, setClipboard)}
            leftSection={<IoCopyOutline />}
          >
            Copy
          </Menu.Item>
          <Menu.Item
            color="blue"
            c={COLOR_CODE.TEXT_CONTROL}
            onClick={() => pasteItems(clipboard, setClipboard)}
            leftSection={<LuClipboardPaste />}
          >
            Paste
          </Menu.Item>
          <Menu.Item
            color="blue"
            c={COLOR_CODE.TEXT_CONTROL}
            onClick={() => duplicateItems(selectedItems)}
            leftSection={<BiDuplicate />}
          >
            Duplicate
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label c="blue">Layer</Menu.Label>
          <Menu.Item
            onClick={handleBringFrontShapes}
            color="blue"
            c={COLOR_CODE.TEXT_CONTROL}
            leftSection={<BsLayerForward />}
          >
            Bring forward
          </Menu.Item>
          <Menu.Item
            onClick={handleBringToTop}
            color="blue"
            c={COLOR_CODE.TEXT_CONTROL}
            leftSection={<TbArrowsUp />}
          >
            Bring to front
          </Menu.Item>
          <Menu.Item
            onClick={handleBringBackShapes}
            color="blue"
            c={COLOR_CODE.TEXT_CONTROL}
            leftSection={<BsLayerBackward />}
          >
            Bring backward
          </Menu.Item>
          <Menu.Item
            onClick={handleBringToBottom}
            color="blue"
            c={COLOR_CODE.TEXT_CONTROL}
            leftSection={<TbArrowsDown />}
          >
            Bring to back
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
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
      {selectedItems.length > 1 && (
        <Tooltip
          label={hasGroup ? 'UnGroup' : 'Group'}
          withArrow
          onClick={hasGroup ? handleUnGroupShapes : handleGroupShapes}
        >
          <ActionIcon
            style={{
              borderRadius: 0,
            }}
            variant="light"
            size="xl"
          >
            {hasGroup ? <UnGroupIcon size={16} /> : <GroupIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
      <Tooltip label="Delete" withArrow>
        <ActionIcon
          onClick={handleRemoveShapes}
          variant="light"
          aria-label="Delete"
          size="xl"
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <IoTrash />
        </ActionIcon>
      </Tooltip>
    </Button.Group>
  );
};

export default BoardMenuItem;
