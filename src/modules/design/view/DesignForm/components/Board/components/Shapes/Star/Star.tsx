import { BaseShape, ShapeTypeEnum } from '@design/types';
import Konva from 'konva';
import { forwardRef } from 'react';
import { Star as KonvaStar } from 'react-konva';

type Props = BaseShape[ShapeTypeEnum.STAR];

const Star = forwardRef<Konva.Star, Props>(
  ({ sides, innerRadius, outerRadius, x, y, ...props }: Props, ref) => {
    return (
      <KonvaStar
        ref={ref}
        sides={sides}
        x={Number(x)}
        y={Number(y)}
        innerRadius={Number(innerRadius)}
        outerRadius={Number(outerRadius)}
        {...props}
      />
    );
  },
);

export default Star;
