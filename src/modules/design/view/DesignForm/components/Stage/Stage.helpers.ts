import Konva from 'konva';
import { IRect, Vector2d } from 'konva/lib/types';
import { decimalUpToSeven } from '../../utils';

export const getScaledMousePosition = (stage: Konva.Stage, e: DragEvent | MouseEvent) => {
  stage.setPointersPositions(e);
  const stageOrigin = stage.getAbsolutePosition();
  const mousePosition = stage.getPointerPosition();
  if (mousePosition) {
    return {
      x: decimalUpToSeven((mousePosition.x - stageOrigin.x) / stage.scaleX()),
      y: decimalUpToSeven((mousePosition.y - stageOrigin.y) / stage.scaleY()),
    };
  }
  return {
    x: 0,
    y: 0,
  };
};

export const getItemsInBoundary = (stage: Konva.Stage, targetItem: Konva.Node) => {
  const boundary = targetItem.getClientRect({ relativeTo: stage.getLayer() });
  const result = targetItem
    .getLayer()
    ?.getChildren((item: Konva.Node) => {
      if (item.name() === 'select-box') {
        return false;
      }
      const itemBoundary = item.getClientRect({ relativeTo: stage.getLayer() });
      return (
        boundary.x <= itemBoundary.x &&
        boundary.y <= itemBoundary.y &&
        boundary.x + boundary.width >= itemBoundary.x + itemBoundary.width &&
        boundary.y + boundary.height >= itemBoundary.y + itemBoundary.height
      );
    })
    .map((item) => {
      if (item.name() === 'label-group') {
        return (item as Konva.Group).findOne('.label-target') ?? null;
      }
      return item;
    })
    .filter(Boolean);
  return result;
};

export const getOriginFromTwoPoint = (
  p1: Vector2d,
  p2: Vector2d,
  size: { width: number; height: number },
): IRect => {
  const result: IRect = {
    x: p1.x,
    y: p1.y,
    width: size.width,
    height: size.height,
  };
  result.x = p1.x;
  result.y = p1.y;
  result.width = p2.x - p1.x;
  result.height = p2.y - p1.y;
  return result;
};
