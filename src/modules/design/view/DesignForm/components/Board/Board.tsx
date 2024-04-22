import { COLOR_CODE, isEmpty } from '@core/common';
import Konva from 'konva';
import { Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useSelection, useStage, useTransformer } from '../../hooks';
import { useDesignStore } from '../../store';
import { IShape } from '../../types';
import Shape, { ShapeMap } from '../Shapes';
import { Stage } from '../Stage';
import BoardMenuItem from './Board.menu-item';

const Board = () => {
  const stage = useStage();

  const { shapes, isDragging } = useDesignStore();
  const transformer = useTransformer();

  const { selectedItems, onSelection, clearSelection } = useSelection(transformer);
  const menuPos = getMenuAbsolutePosition(transformer.transformerRef.current);

  return (
    <Stage stage={stage} onSelect={onSelection}>
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
        borderStroke={COLOR_CODE.SUCCESS}
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
