import { BaseShape, ShapeTypeEnum } from '@design/types';
import Konva from 'konva';
import { forwardRef } from 'react';
import { useImage } from 'react-konva-utils';
import { ShapeMap } from '..';

type Props = BaseShape[ShapeTypeEnum.IMAGE_FRAME] & {};

const BASE_PATTERN_SCALE = { x: 0.15, y: 0.15 };

const ImageFramer = forwardRef<Konva.Shape, Props>(
  ({ src, baseNode, fillPatternScale = BASE_PATTERN_SCALE, ...props }, ref) => {
    const [img] = useImage(src);

    const ShapeCmp = ShapeMap[baseNode as ShapeTypeEnum];

    const imgProps = {
      fillPatternImage: img,
    };

    return (
      <ShapeCmp
        ref={ref}
        {...props}
        baseNode={baseNode}
        fillPatternScale={fillPatternScale}
        src={src}
        {...imgProps}
      />
    );
  },
);

export default ImageFramer;
