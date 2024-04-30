import { isEmpty } from '@core/common';
import Konva from 'konva';
import { groupBy, orderBy } from 'lodash';
import { IShape } from '../../types';

const ROTATION_BUTTON_HEIGHT = 70;
const MENU_WIDTH = 132;

export const getMenuAbsolutePosition = (transformRef: Konva.Transformer) => {
  if (isEmpty(transformRef)) return { x: 0, y: 0 };

  const scale = transformRef.getAbsoluteScale().x;
  const { x, y, width } = transformRef.getClientRect();

  return {
    x: x * scale + (width * scale) / 2 - MENU_WIDTH / 2,
    y: y * scale - ROTATION_BUTTON_HEIGHT,
  };
};

export const mapShapeByGroupAndZIndex = (shapes: IShape[]) => {
  const groups = groupBy(shapes, 'attrs.group');

  const newGroups = orderBy(
    Object.entries(groups).map(([key, values]) => {
      const maxZIndexGroups = Math.max(...values.map((value) => value.attrs.layerIdx || 0));

      const sortedShapes = orderBy(values, ['attrs.layerIdx'], ['desc']);
      return {
        group: key,
        shapes: sortedShapes,
        maxZIndex: key === 'undefined' ? -1 : maxZIndexGroups,
      };
    }),
    ['maxZIndex'],
    ['desc'],
  );

  return newGroups;
};
