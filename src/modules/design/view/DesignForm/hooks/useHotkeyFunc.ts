import { getRandomId } from '@core/common';
import { Node, NodeConfig } from 'konva/lib/Node';
import { useSelection, useShape, useStage } from '.';
import { IShape, ShapeTypeEnum } from '../types';

const useHotkeyFunc = () => {
  const { addShape, addShapes, updateShape, removeShape } = useShape();

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

  const pasteItems = (
    clipboard: IShape[],
    setClipboard: (value: React.SetStateAction<IShape[]>) => void,
  ) => {
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

    setClipboard(newShapes);
    addShapes(newShapes);
  };

  const duplicateItems = (selectedItems: Node<NodeConfig>[]) => {
    selectedItems
      .map((item) => {
        const { id } = item.attrs;

        return {
          id: getRandomId(),
          attrs: {
            ...(selectedItems.find((_item) => _item.attrs.id === id)?.attrs ?? ({} as any)),
          },
        };
      })
      .forEach((item, index) => {
        addShape({
          ...item,
          attrs: {
            ...item.attrs,
            x: item.attrs.x + selectedItems[0].scaleX() * 50,
            y: item.attrs.y + selectedItems[0].scaleY() * 50,
          },
        });
      });

    if (selectedItems.length > 0) {
      selectedItems[0].getStage().batchDraw();
    }
  };

  return {
    selectAll,
    copyItems,
    pasteItems,
    duplicateItems,
  };
};

export default useHotkeyFunc;
