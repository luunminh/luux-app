import { COLOR_CODE, isEmpty } from '@core/common';
import { useMantineTheme } from '@mantine/core';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import {
  useDesignLS,
  useHotkeyFunc,
  useSelection,
  useShape,
  useStage,
  useTransformer,
  useWorkHistory,
} from '../../hooks';
import { useDesignStore } from '../../store';
import { IShape } from '../../types';
import Shape, { ShapeMap } from '../Shapes';
import { Stage } from '../Stage';
import BoardMenuItem from './Board.menu-item';

type Props = {
  pageNumber: number;
  transformer: ReturnType<typeof useTransformer>;
  workHistory: ReturnType<typeof useWorkHistory>;
};

const Board = ({ pageNumber, transformer, workHistory }: Props) => {
  const { isDragging, data } = useDesignStore();

  const { shapes } = useShape();

  const stage = useStage();
  const stageRef = useRef<HTMLDivElement>(null);

  const { getClipboard } = useDesignLS();
  const [clipboard, setClipboard] = useState<IShape[]>(getClipboard() || []);

  const theme = useMantineTheme();

  const { goToFuture, goToPast, recordPast } = workHistory;

  const { selectAll, copyItems, pasteItems, duplicateItems, deleteItems } = useHotkeyFunc();
  const { selectedItems, onSelection, clearSelection, setSelectedItems } =
    useSelection(transformer);

  const menuPos = getMenuAbsolutePosition(transformer.transformerRef.current);

  useEffect(() => {
    recordPast(data);
  }, [data, recordPast]);

  useHotkeys(
    'ctrl+z',
    (e) => {
      e.preventDefault();
      goToPast();
    },
    {},
    [goToPast],
  );

  useHotkeys(
    'ctrl+y',
    (e) => {
      e.preventDefault();
      goToFuture();
    },
    {},
    [goToFuture],
  );

  useHotkeys(
    'ctrl+a',
    (e) => {
      e.preventDefault();
      selectAll(stage, onSelection);
    },
    {},
    [selectedItems],
  );

  useHotkeys(
    'ctrl+d',
    (e) => {
      e.preventDefault();
      duplicateItems(selectedItems);
    },
    {},
    [selectedItems, shapes],
  );

  useHotkeys(
    'ctrl+c',
    (e) => {
      e.preventDefault();
      copyItems(selectedItems, setClipboard);
    },
    {},
    [selectedItems, stage, clipboard],
  );

  useHotkeys(
    'ctrl+v',
    (e) => {
      e.preventDefault();
      pasteItems(clipboard, setClipboard);
    },
    {},
    [clipboard, pasteItems],
  );

  useHotkeys(
    'backspace',
    (e) => {
      e.preventDefault();
      deleteItems(selectedItems, setSelectedItems, transformer.transformerRef);
    },
    { enabled: Boolean(selectedItems.length) },
    [selectedItems, transformer.transformerRef.current],
  );

  return (
    <Stage stage={stage} onSelect={onSelection} ref={stageRef}>
      {shapes.map((shape: IShape) => {
        const ShapeComponent = ShapeMap[shape.attrs.shapeType];
        if (!isEmpty(ShapeComponent)) {
          return (
            //@ts-ignore
            <Shape.Wrapper<typeof shape>
              key={shape.id}
              shape={shape}
              onSelect={onSelection}
              transformer={transformer}
            >
              <ShapeComponent />
            </Shape.Wrapper>
          );
        } else {
          return null;
        }
      })}
      <Transformer
        ref={transformer.transformerRef}
        rotateEnabled
        keepRatio
        borderDash={[6, 0]}
        anchorCornerRadius={10}
        shouldOverdrawWholeArea
        anchorFill={COLOR_CODE.WHITE}
        borderStroke={theme.colors.blue[5]}
        anchorStroke={COLOR_CODE.GRAY_500}
        boundBoxFunc={(_, newBox) => newBox}
        onTransformEnd={transformer.onTransformEnd}
      />
      {!isEmpty(selectedItems) && !isDragging && (
        <Html
          groupProps={{
            x: menuPos.x,
            y: menuPos.y,
          }}
        >
          <Board.MenuItem selectedItems={selectedItems} clearSelection={clearSelection} />
        </Html>
      )}
    </Stage>
  );
};

const getMenuAbsolutePosition = (transformRef: Konva.Transformer) => {
  if (isEmpty(transformRef)) return { x: 0, y: 0 };

  const scale = transformRef.getAbsoluteScale().x;
  const { x, y, width } = transformRef.getClientRect();

  return {
    x: x * scale + width * scale,
    y: y * scale,
  };
};

Board.MenuItem = BoardMenuItem;

export default Board;
