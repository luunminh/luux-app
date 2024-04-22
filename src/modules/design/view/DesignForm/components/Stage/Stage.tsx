import { COLOR_CODE } from '@core/common';
import { Box, Stack } from '@mantine/core';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { IRect, Vector2d } from 'konva/lib/types';
import { PropsWithChildren, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Stage as KonvaStage, Layer } from 'react-konva';
import { useStage } from '../../hooks';
import { ITEMS_CONTEXT } from '../../types';
import { decimalUpToSeven } from '../../utils';

type Props = PropsWithChildren & {
  onSelect: ITEMS_CONTEXT['onSelect'];
  stage: ReturnType<typeof useStage>;
};

const Stage = ({ children, stage, onSelect }: Props) => {
  const { stageRef } = stage;

  const zoomOnWheel = useCallback(
    (e: KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();
      const stage = stageRef.current;
      if (!stage) {
        return;
      }
      const zoomDirection = e.evt.deltaY > 0 ? -1 : 1;
      const scaleBy = 1.1;
      const oldScale = stage.scaleX();

      const pointer = stage.getPointerPosition();

      if (!pointer) {
        return;
      }

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      const newScale = zoomDirection > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);
    },
    [stageRef],
  );

  const onSelectEmptyBackground = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      e.target.getType() === 'Stage' && onSelect(e);
    },
    [onSelect],
  );

  const onMouseDownOnStage = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      onSelectEmptyBackground(e);
      const stage = e.target.getStage();
      if (!stage) {
        return;
      }
    },
    [onSelectEmptyBackground],
  );

  useHotkeys(
    'space',
    (e) => {
      stageRef.current?.draggable(false);
      stageRef.current?.fire('mouseup');
    },
    { keyup: true },
    [stageRef.current],
  );

  return (
    <Stack align="center" justify="center">
      <Box
        pos="relative"
        style={{
          width: 'fit-content',
          background: COLOR_CODE.WHITE,
          border: COLOR_CODE.BORDER_DEFAULT,
        }}
      >
        <KonvaStage
          draggable={false}
          ref={stageRef}
          width={window.innerWidth * 0.7}
          height={window.innerHeight * 0.7}
          onWheel={zoomOnWheel}
          onMouseDown={onMouseDownOnStage}
        >
          <Layer>{children}</Layer>
        </KonvaStage>
      </Box>
    </Stack>
  );
};

export default Stage;

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
