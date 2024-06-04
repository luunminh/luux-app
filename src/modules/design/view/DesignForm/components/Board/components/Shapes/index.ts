import { ShapeTypeEnum } from '@design/types';
import { FC } from 'react';
import { Arc, Arrow, Circle, Ellipse, Label, Line, Rect, Ring, Sprite, Tag } from 'react-konva';
import { CustomShape } from './CustomShape';
import { Image } from './Image';
import { ImageFramer } from './ImageFramer';
import { Polygon } from './Polygon';
import ShapeWrapper from './ShapeWrapper';
import { Star } from './Star';
import { Text } from './Text';

const Shape = {
  Wrapper: ShapeWrapper,
  Arc: Arc,
  Arrow: Arrow,
  Circle: Circle,
  Ellipse: Ellipse,
  Image: Image,
  Label: Label,
  Line: Line,
  RegularPolygon: Polygon,
  Ring: Ring,
  Sprite: Sprite,
  Star: Star,
  Tag: Tag,
  Text: Text,
  Custom: CustomShape,
  Rectangle: Rect,
};

export const ShapeMap: { [K in ShapeTypeEnum]: FC<any> } = {
  [ShapeTypeEnum.ARC]: Arc,
  [ShapeTypeEnum.ARROW]: Arrow,
  [ShapeTypeEnum.CIRCLE]: Circle,
  [ShapeTypeEnum.ELLIPSE]: Ellipse,
  [ShapeTypeEnum.IMAGE]: Image,
  [ShapeTypeEnum.LABEL]: Label,
  [ShapeTypeEnum.LINE]: Line,
  [ShapeTypeEnum.REGULAR_POLYGON]: Polygon,
  [ShapeTypeEnum.RING]: Ring,
  [ShapeTypeEnum.SPRITE]: Sprite,
  [ShapeTypeEnum.STAR]: Star,
  [ShapeTypeEnum.TAG]: Tag,
  [ShapeTypeEnum.TEXT]: Text,
  [ShapeTypeEnum.RECTANGLE]: Rect,

  [ShapeTypeEnum.CUSTOM]: CustomShape,
  [ShapeTypeEnum.IMAGE_FRAME]: ImageFramer,
};

export default Shape;
