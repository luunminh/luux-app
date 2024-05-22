import { useShape } from '@design/hooks';
import { BaseShape, ShapeTypeEnum } from '@design/types';
import Konva from 'konva';
import { forwardRef } from 'react';
import { Image as KonvaImage } from 'react-konva';

type Props = BaseShape[ShapeTypeEnum.IMAGE];

type Size = {
  width: number;
  height: number;
};

const Image = forwardRef<Konva.Image, Props>(({ sides, radius, image, ...props }: Props, ref) => {
  const { getShapeById, updateShape } = useShape();

  const selectedShape = getShapeById(props.id);
  const crop = selectedShape.attrs.crop || {
    x: 50,
    y: 50,
    width: null,
    height: null,
  };

  const getCrop = (image: Size, newSize: Size) => {
    const aspectRatio = newSize.width / newSize.height;
    const imageRatio = image.width / image.height;

    let newWidth = aspectRatio >= imageRatio ? image.width : image.height * aspectRatio;
    let newHeight = aspectRatio >= imageRatio ? image.width / aspectRatio : image.height;

    let x = (image.width - newWidth) / 2;
    let y = (image.height - newHeight) / 2;

    return {
      x: x,
      y: y,
      width: newWidth,
      height: newHeight,
    };
  };

  const handleTransformImage = (end: boolean) => {
    const node = (ref as React.RefObject<Konva.Image>).current;

    const scaleX = node!.scaleX();
    const scaleY = node!.scaleY();

    let newWidth = Math.max(5, node!.width() * scaleX);
    let newHeight = Math.max(node!.height() * scaleY);

    node?.scaleX(1);
    node?.scaleY(1);

    const crop = getCrop(
      //@ts-ignore
      { width: image?.width, height: image?.height },
      { width: newWidth, height: newHeight },
    );

    node?.width(newWidth);
    node?.height(newHeight);
    node.crop(crop);

    if (end) {
      updateShape(props.id, { ...selectedShape, attrs: { ...selectedShape.attrs, crop } } as any);
    }
  };

  return (
    <KonvaImage
      ref={ref}
      image={image}
      crop={getCrop(crop, { width: selectedShape.attrs.width, height: selectedShape.attrs.height })}
      onTransform={(e) => {
        handleTransformImage(false);
      }}
      onTransformEnd={(e) => {
        handleTransformImage(true);
      }}
      {...props}
    />
  );
});

export default Image;
