import { useDesignStore } from '@modules/design/view/DesignForm/store';
import { BaseShape, ShapeTypeEnum } from '@modules/design/view/DesignForm/types';
import Konva from 'konva';
import { forwardRef } from 'react';
import { Text as KonvaText } from 'react-konva';

type Props = BaseShape[ShapeTypeEnum.TEXT];

const ResizeText = forwardRef<Konva.Text, Props>(({ fontFamily, height, ...props }: Props, ref) => {
  const { scale } = useDesignStore();
  const handleResize = () => {
    //@ts-ignore
    if (ref.current) {
      //@ts-ignore
      const textNode = ref.current;
      const newWidth = textNode.width() * textNode.scaleX();

      textNode.setAttrs({
        width: newWidth,
        scaleX: 1 / scale,
      });
    }
  };

  return (
    <KonvaText
      ref={ref}
      {...props}
      wrap="char"
      fontFamily={fontFamily}
      onTransform={handleResize}
      perfectDrawEnabled={false}
    />
  );
});

export default ResizeText;
