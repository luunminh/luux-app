import { getRandomId } from '@core/common';
import { Node, NodeConfig } from 'konva/lib/Node';
import { useDesignLS, useSelection, useShape, useStage, useTransformer } from '.';
import { IShape, ShapeTypeEnum } from '../types';

const useHotkeyFunc = () => {
  const { addShapes, removeShapes } = useShape();
  const { setClipboard: setLsClipboard } = useDesignLS();
  const selectAll = (
    stage: ReturnType<typeof useStage>,
    onSelectItem: ReturnType<typeof useSelection>['onSelection'],
  ) => {
    const layer = stage.stageRef.current.getChildren()[0];

    const items = layer.getChildren(
      (_item) =>
        Object.values(ShapeTypeEnum).includes(_item.attrs.shapeType) && !_item.attrs.locked,
    );

    const itemInsideGroups = layer
      .getChildren((item) => item.getClassName() === 'Group')
      .map((group: any) => group.children)
      .flat();

    onSelectItem(null, [...items, ...itemInsideGroups]);
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

    setLsClipboard(selectedShapes);
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
      const id = getRandomId();
      return {
        id,
        attrs: {
          ...item.attrs,
          id,
          x: item.attrs.x + 10 || 0,
          y: item.attrs.y + 10 || 0,
        },
      };
    });

    setClipboard(newShapes);
    addShapes(newShapes);
  };

  const duplicateItems = (selectedItems: Node<NodeConfig>[]) => {
    const newShapes = selectedItems.map((item) => {
      const id = getRandomId();
      return {
        id,
        attrs: {
          ...item.attrs,
          id,
          x: item.attrs.x + 10,
          y: item.attrs.y + 10,
        },
      };
    });

    addShapes(newShapes);

    if (selectedItems.length > 0) {
      selectedItems[0].getStage().batchDraw();
    }
  };

  const deleteItems = (
    selectedItems: Node<NodeConfig>[],
    setSelectedItems: (value: React.SetStateAction<Node<NodeConfig>[]>) => void,
    transformerRef: ReturnType<typeof useTransformer>['transformerRef'],
  ) => {
    setSelectedItems([]);
    transformerRef.current?.nodes([]);
    removeShapes(selectedItems.map((item) => item.id()));
  };

  return {
    selectAll,
    copyItems,
    pasteItems,
    duplicateItems,
    deleteItems,
  };
};

export default useHotkeyFunc;
