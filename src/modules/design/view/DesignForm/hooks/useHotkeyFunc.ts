import { getRandomId } from '@core/common';
import { Node, NodeConfig } from 'konva/lib/Node';
import { useSelection, useShape, useStage } from '.';
import { IShape, ShapeTypeEnum } from '../types';

const useHotkeyFunc = () => {
  const { addShapes, updateShape, removeShape } = useShape();

  const selectAll = (
    stage: ReturnType<typeof useStage>,
    onSelectItem: ReturnType<typeof useSelection>['onSelection'],
  ) => {
    const layer = stage.stageRef.current.getChildren()[0];

    const items = layer.getChildren((_item) =>
      Object.values(ShapeTypeEnum).includes(_item.attrs.shapeType),
    );

    onSelectItem(null, items);
  };

  const copyItems = (
    selectedItems: Node<NodeConfig>[],
    setClipboard: (value: React.SetStateAction<IShape[]>) => void,
  ) => {
    const selectedShapes: IShape[] = selectedItems.map((item) => {
      return {
        id: item.id(),
        attrs: item.attrs,
      };
    });

    setClipboard(selectedShapes);
  };

  const pasteItems = (clipboard: IShape[]) => {
    //@ts-ignore
    const newShapes: IShape[] = clipboard.map((item) => {
      if (Object.keys(item.attrs).length === 0) {
        return null;
      }

      return {
        id: getRandomId(),
        attrs: {
          ...item.attrs,
          x: item.attrs.x + 10 || 0,
          y: item.attrs.y + 10 || 0,
        },
      };
    });

    addShapes(newShapes);
  };

  // TODO: handle undo, redo

  return {
    selectAll,
    copyItems,
    pasteItems,
  };
};

export default useHotkeyFunc;
