import { useShape } from '@design/hooks';
import { useDesignStore } from '@design/store';
import { BaseShapeRef, IShape, ITEMS_CONTEXT, ShapeTypeEnum } from '@design/types';
import Konva from 'konva';
import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
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

  const [img] = useImage(shape.attrs.src);

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

  const onEditTextStart = useCallback(() => {
    if (shapeRef.current === null) {
      console.error('shapeRef is null');
      return;
    }
    shapeRef.current.hide();
    transformer.transformerRef.current!.hide();
    const textPosition = shapeRef.current.getAbsolutePosition();
    const stage = shapeRef.current.getStage();
    const container = stage!.container().getBoundingClientRect();
    const areaPosition = {
      x: container.x + textPosition.x,
      y: container.y + textPosition.y + 15,
    };
    const textarea = document.createElement('textarea');

    textarea.id = `current_text_editor--${shape.id}`;
    textarea.innerHTML = shapeRef.current.text();
    textarea.style.zIndex = '100';
    textarea.style.fontFamily = shapeRef.current.attrs.fontFamily;
    textarea.style.fontWeight = shapeRef.current.attrs.fontStyle;
    textarea.style.position = 'absolute';
    textarea.style.top = `${areaPosition.y}px`;
    textarea.style.left = `${areaPosition.x}px`;
    textarea.style.fontSize = `${
      shapeRef.current.fontSize() * stage!.scaleY() * shapeRef.current.scaleY()
    }px`;
    textarea.style.width = `${textarea.value
      .split('\n')
      .sort((a, b) => b.length - a.length)[0]
      .split('')
      .reduce(
        (acc, curr) =>
          curr.charCodeAt(0) >= 32 && curr.charCodeAt(0) <= 126
            ? acc +
              shapeRef.current!.fontSize() * stage!.scaleY() * shapeRef.current!.scaleY() * (3 / 5)
            : acc + shapeRef.current!.fontSize() * stage!.scaleY() * shapeRef.current!.scaleY(),
        0,
      )}px`;
    textarea.style.height = `${shapeRef.current.height() + shapeRef.current.padding() * 2 + 10}px`;
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = shapeRef.current.lineHeight().toString();
    textarea.style.fontFamily = shapeRef.current.attrs.fontFamily;
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = shapeRef.current.align();
    textarea.style.color = shapeRef.current.fill();

    document.body.appendChild(textarea);

    transformer.transformerRef.current!.show();
    updateSize();

    const rotation = shapeRef.current.rotation();
    let transform = '';
    if (rotation) {
      transform += `rotateZ(${rotation}deg)`;
    }

    let px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(shapeRef.current.fontSize() / 20);
    }
    transform += `translateY(-${px}px)`;

    textarea.style.transform = transform;

    // reset height
    textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    textarea.style.height = `${textarea.scrollHeight + 3}px`;

    textarea.focus();

    function updateSize() {
      const lines = textarea.value.split('\n');
      const lineHeight = shapeRef.current!.fontSize() * shapeRef.current!.scaleY();
      const newHeight = (lines.length === 0 ? lineHeight : lines.length * lineHeight) + 10;

      shapeRef.current!.height(newHeight);

      // Create a canvas to measure the text width
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Set the font of the context to match the font of the shape
      context.font = `${shapeRef.current!.fontSize()}px ${shapeRef.current!.fontFamily()}`;

      // Get the width of the longest line
      const newWidth = Math.max(...lines.map((line) => context.measureText(line).width)) + 10;

      textarea.style.width = `${newWidth}px`;
      textarea.style.height = `${newHeight}px`;

      // Update the width and height of the shape
      shapeRef.current!.width(newWidth);
      shapeRef.current!.height(textarea.scrollHeight);
    }

    textarea.addEventListener('input', (e) => {
      shapeRef!.current!.text(textarea.value);

      updateSize();
    });

    textarea.addEventListener('keydown', (e) => {
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextArea(true);
      }
    });

    textarea.addEventListener('keydown', (e) => {
      updateSize();
    });

    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapeRef, updateShape]);

  function handleOutsideClick(e: MouseEvent) {
    const textarea = document.getElementById(
      `current_text_editor--${shape.id}`,
    ) as HTMLTextAreaElement;

    if (e.target !== textarea) {
      shapeRef!.current!.text(textarea.value);
      removeTextArea(true);
    }
  }

  const removeTextArea = (isUpdate = false) => {
    const textarea = document.getElementById(
      `current_text_editor--${shape.id}`,
    ) as HTMLTextAreaElement;
    const stage = shapeRef.current.getStage();

    if (textarea) {
      window.removeEventListener('click', handleOutsideClick);
      shapeRef!.current!.show();
      //@ts-ignore
      const newShape: IShape = {
        id: shapeRef.current!.id,
        attrs: {
          ...shapeRef.current!.attrs,
          width:
            textarea.getBoundingClientRect().width / stage!.scaleY() / shapeRef.current!.scaleY(),
          height: textarea.value.split('\n').length * shapeRef.current!.fontSize() * 1.2,
        },
      };
      if (isUpdate) {
        updateShape(shapeRef.current!.id, newShape);
      }
      textarea.parentNode!.removeChild(textarea);
    }
  };

  const updateTextareaPosition = useCallback(() => {
    const textarea = document.getElementById(
      `current_text_editor--${shape.id}`,
    ) as HTMLTextAreaElement;
    if (textarea) {
      const textPosition = shapeRef.current.getAbsolutePosition();
      const stage = shapeRef.current.getStage();
      const container = stage!.container().getBoundingClientRect();
      const areaPosition = {
        x: container.x + textPosition.x,
        y: container.y + textPosition.y,
      };

      textarea.style.top = `${areaPosition.y}px`;
      textarea.style.left = `${areaPosition.x}px`;
      textarea.style.fontFamily = shapeRef.current.attrs.fontFamily;
      textarea.style.fontWeight = shapeRef.current.attrs.fontStyle;
    }
  }, [shape.id]);

  const wrapperWidth = document.querySelector('.board-wrapper')?.clientWidth;

  useEffect(() => {
    const textarea = document.getElementById(
      `current_text_editor--${shape.id}`,
    ) as HTMLTextAreaElement;
    if (textarea) {
      updateTextareaPosition();
    }
  }, [wrapperWidth, shape.id, updateTextareaPosition]);

  //update shape size when font family is changed
  useEffect(() => {
    if (shapeRef.current?.attrs.fontFamily) {
      const textarea = document.getElementById(
        `current_text_editor--${shape.id}`,
      ) as HTMLTextAreaElement;
      if (textarea) {
        textarea.onkeydown(new KeyboardEvent('keydown', { key: 'alt' }));
      }
    }
  }, [shapeRef.current?.attrs.fontFamily, shape.id]);

  const handleDoubleClickShape = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (isText) {
      setTimeout(() => {
        onEditTextStart();
      }, 300);

      return;
    }

    onSelect(e);
  };

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // Add delay for text double click text event
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
        ...(isText && {
          onTransformStart: removeTextArea,
        }),
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
