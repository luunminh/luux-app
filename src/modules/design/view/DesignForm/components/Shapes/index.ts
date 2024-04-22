import { FC } from 'react';
import {
  Arc,
  Arrow,
  Circle,
  Shape as CustomShape,
  Ellipse,
  Image,
  Label,
  Line,
  Rect,
  RegularPolygon,
  Ring,
  Sprite,
  Star,
  Tag,
  Text,
} from 'react-konva';
import { ShapeTypeEnum } from '../../types';
import ShapeWrapper from './ShapeWrapper';

const Shape = {
  Wrapper: ShapeWrapper,
  Arc: Arc,
  Arrow: Arrow,
  Circle: Circle,
  Ellipse: Ellipse,
  Image: Image,
  Label: Label,
  Line: Line,
  RegularPolygon: RegularPolygon,
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
  [ShapeTypeEnum.REGULAR_POLYGON]: RegularPolygon,
  [ShapeTypeEnum.RING]: Ring,
  [ShapeTypeEnum.SPRITE]: Sprite,
  [ShapeTypeEnum.STAR]: Star,
  [ShapeTypeEnum.TAG]: Tag,
  [ShapeTypeEnum.TEXT]: Text,
  [ShapeTypeEnum.CUSTOM]: CustomShape,
  [ShapeTypeEnum.RECTANGLE]: Rect,
};

export default Shape;
