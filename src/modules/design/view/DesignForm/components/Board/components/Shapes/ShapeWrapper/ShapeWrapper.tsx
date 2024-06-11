import { useShape } from '@design/hooks';
import { useDesignStore } from '@design/store';
import { BaseShapeRef, IShape, ITEMS_CONTEXT, ShapeTypeEnum } from '@design/types';
import Konva from 'konva';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useImage } from 'react-konva-utils';

import './styles.scss';

type Props<T extends IShape> = PropsWithChildren<T> & {
  shape: T;
  onSelect: ITEMS_CONTEXT['onSelect'];
  transformer: ITEMS_CONTEXT['transformer'];
  children: React.ReactElement<React.RefAttributes<Konva.Shape>>;
};

const ShapeWrapper = <T extends IShape>({ children, shape, onSelect, transformer }: Props<T>) => {
  const shapeRef = useRef<BaseShapeRef>(null);

  const { updateShape } = useShape();
  const { onSetIsDragging } = useDesignStore();

  const isSelected = transformer.transformerRef?.current
    ?.getNodes()
    .some((node) => node.id() === shape.id);

  const [img] = useImage(shape.attrs.src, 'anonymous');

  const isText = shape.attrs.shapeType === ShapeTypeEnum.TEXT;
  const isImage = shape.attrs.shapeType === ShapeTypeEnum.IMAGE;

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    onSetIsDragging(true);
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const updatedShape: IShape = {
      id: e.currentTarget.id(),
      attrs: e.currentTarget.attrs,
    };

    updateShape(e.currentTarget.id(), updatedShape);
    onSetIsDragging(false);
  };

  const handleDoubleClickShape = (e: Konva.KonvaEventObject<MouseEvent>) => {
    onSelect(e);
  };

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const delayTimer = isText ? 200 : 0;

    setTimeout(() => {
      const parent = e.target?.getParent();

      if (parent.getClassName() === 'Group') {
        onSelect(null, parent.getChildren());
        return;
      }

      onSelect(e);
    }, delayTimer);
  };

  /**
   * Layer, group handling
   */

  useEffect(() => {
    if (typeof shapeRef.current?.attrs.layerIdx === 'number') {
      shapeRef.current.setZIndex(shapeRef.current.attrs.layerIdx);
    }
  }, [shapeRef.current?.attrs.layerIdx]);

  useEffect(() => {
    if (shapeRef.current?.attrs.group) {
      const group = shapeRef.current.getParent();

      const maxZIndex = Math.max(...group.getChildren().map((node) => node.attrs.layerIdx || 0));
      group.setZIndex(maxZIndex);
    }
  }, [shapeRef.current?.attrs.group]);

  return (
    <>
      {React.cloneElement(children, {
        ref: shapeRef,
        id: shape.id,

        ...shape.attrs,
        ...(isImage && { image: img }),
        ...(isText && { onSelect: onSelect, transformer: transformer }),
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onClick: handleClick,
        onDblClick: handleDoubleClickShape,
        listening: isSelected ? false : true,
      })}
    </>
  );
};

export default ShapeWrapper;
