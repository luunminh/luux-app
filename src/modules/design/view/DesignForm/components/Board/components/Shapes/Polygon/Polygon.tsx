import { BaseShape, ShapeTypeEnum } from '@design/types';
import Konva from 'konva';
import { forwardRef } from 'react';
import { RegularPolygon } from 'react-konva';

type Props = BaseShape[ShapeTypeEnum.REGULAR_POLYGON];

const Polygon = forwardRef<Konva.RegularPolygon, Props>(
  ({ sides, radius, ...props }: Props, ref) => {
    return <RegularPolygon ref={ref} sides={sides} radius={Number(radius)} {...props} />;
  },
);

export default Polygon;
