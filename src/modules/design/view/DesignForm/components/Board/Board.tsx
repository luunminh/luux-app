import { COLOR_CODE, isEmpty } from '@core/common';
import { useMantineTheme } from '@mantine/core';
import { KonvaEventObject } from 'konva/lib/Node';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Group, Transformer } from 'react-konva';
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
import { IShape, ShapeTypeEnum } from '../../types';
import { getMenuAbsolutePosition, mapShapeByGroupAndZIndex } from './Board.helpers';
import BoardMenuItem from './Board.menu-item';
import { ShapeMap, Stage } from './components';
import Shape from './components/Shapes';

type Props = {
  pageNumber: number;
  transformer: ReturnType<typeof useTransformer>;
  workHistory: ReturnType<typeof useWorkHistory>;
};

const Board = forwardRef(
  ({ pageNumber, transformer, workHistory }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { isDragging, data } = useDesignStore();
    const { shapes } = useShape();

    const stage = useStage();

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

    // handle click outside of stage
    useEffect(() => {
      const boardContainer = document.querySelector('.board-wrapper');
      const stageContainer = document.querySelector('.stage-wrapper');

      const handleClick = (e: any) => {
        if (stageContainer && !stageContainer.contains(e.target)) {
          clearSelection();
        }
      };

      if (boardContainer) {
        boardContainer.addEventListener('click', handleClick);
      }

      return () => {
        if (boardContainer) {
          boardContainer.removeEventListener('click', handleClick);
        }
      };
    }, [clearSelection, selectedItems]);

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

    const handleDoubleClickTransform = (e: KonvaEventObject<MouseEvent>) => {
      if (selectedItems.length === 1) {
        if (selectedItems[0].attrs.shapeType === ShapeTypeEnum.TEXT) {
          selectedItems[0].fire('dblclick');
        }
        return;
      }
    };

    const renderShapes = (shapes: IShape[]) => {
      return shapes.map((shape: IShape) => {
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
      });
    };

    return (
      <Stage stage={stage} onSelect={onSelection}>
        {mapShapeByGroupAndZIndex(shapes).map(({ group, shapes, maxZIndex }) => {
          if (group === 'undefined') {
            return renderShapes(shapes);
          }

          return (
            <Group listening key={group} id={group} zIndex={maxZIndex}>
              {renderShapes(shapes)}
            </Group>
          );
        })}
        <Transformer
          ref={transformer.transformerRef}
          rotateEnabled
          borderDash={[6, 0]}
          anchorCornerRadius={10}
          shouldOverdrawWholeArea
          onDblClick={handleDoubleClickTransform}
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
            <BoardMenuItem
              stage={stage}
              selectedItems={selectedItems}
              clearSelection={clearSelection}
            />
          </Html>
        )}
      </Stage>
    );
  },
);

export default Board;
