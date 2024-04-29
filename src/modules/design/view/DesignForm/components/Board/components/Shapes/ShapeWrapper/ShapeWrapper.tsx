import { useSelection, useShape } from '@design/hooks';
import { useDesignStore } from '@design/store';
import { BaseShapeRef, IShape, ITEMS_CONTEXT, ShapeTypeEnum } from '@design/types';
import html2canvas from 'html2canvas';
import Konva from 'konva';
import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
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

  const [textRendered, setTextRendered] = useState(null);

  const { updateShape } = useShape();
  const { onSetIsDragging } = useDesignStore();

  const { selectedItems } = useSelection(transformer);
  const isSelected = selectedItems.some((item) => item.id() === shape.id);

  useEffect(() => {
    const elmContent = document.querySelector('.ProseMirror') as HTMLElement;

    if (elmContent) {
      html2canvas(elmContent, {}).then((canvas) => setTextRendered(canvas));
    }
  }, [shape.attrs.content]);

  const [img] = useImage(shape.attrs.src);

  const isText = shape.attrs.shapeType === ShapeTypeEnum.TEXT;
  const isImage = shape.attrs.shapeType === ShapeTypeEnum.IMAGE;
  const isCustom = shape.attrs.shapeType === ShapeTypeEnum.CUSTOM;

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
      y: container.y + textPosition.y,
    };
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.id = 'current_text_editor';
    textarea.innerHTML = shapeRef.current.text();
    textarea.style.zIndex = '100';
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
    textarea.style.height = `${shapeRef.current.height() + shapeRef.current.padding() * 2 + 5}px`;
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = shapeRef.current.lineHeight().toString();
    textarea.style.fontFamily = shapeRef.current.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = shapeRef.current.align();
    textarea.style.color = shapeRef.current.fill();
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

    function removeTextarea() {
      window.removeEventListener('click', handleOutsideClick);
      shapeRef!.current!.show();
      transformer.transformerRef.current!.show();
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
      updateShape(shapeRef.current!.id, newShape);
      textarea.parentNode!.removeChild(textarea);
    }

    function setTextareaWidth() {
      let newWidth = textarea.value
        .split('\n')
        .sort((a, b) => b.length - a.length)[0]
        .split('')
        .reduce(
          (acc, curr) =>
            curr.charCodeAt(0) >= 32 && curr.charCodeAt(0) <= 126
              ? acc +
                shapeRef.current!.fontSize() *
                  stage!.scaleY() *
                  shapeRef.current!.scaleY() *
                  (3 / 5)
              : acc + shapeRef.current!.fontSize() * stage!.scaleY() * shapeRef.current!.scaleY(),
          0,
        );
      // some extra fixes on different browsers
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      textarea.style.width = `${newWidth}px`;
    }

    textarea.addEventListener('input', (e) => {
      textarea.style.width = `${textarea.value
        .split('\n')
        .sort((a, b) => b.length - a.length)[0]
        .split('')
        .reduce(
          (acc, curr) =>
            curr.charCodeAt(0) >= 32 && curr.charCodeAt(0) <= 126
              ? acc +
                shapeRef.current!.fontSize() *
                  stage!.scaleY() *
                  shapeRef.current!.scaleY() *
                  (3 / 5)
              : acc + shapeRef.current!.fontSize() * stage!.scaleY() * shapeRef.current!.scaleY(),
          0,
        )}px`;
    });

    textarea.addEventListener('keydown', (e) => {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        shapeRef!.current!.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener('keydown', (e) => {
      setTextareaWidth();
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + shapeRef!.current!.fontSize()}px`;
    });

    function handleOutsideClick(e: MouseEvent) {
      if (e.target !== textarea) {
        shapeRef!.current!.text(textarea.value);
        removeTextarea();
      }
    }

    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  }, [shapeRef, transformer, updateShape]);

  const handleDoubleClickText = (e: Konva.KonvaEventObject<MouseEvent>) => {
    onEditTextStart();
  };

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    onSelect(e);
  };

  return (
    <>
      {React.cloneElement(children, {
        ref: shapeRef,
        id: shape.id,

        ...shape.attrs,
        ...(isImage && { image: img }),
        ...(isText && { image: textRendered }),
        ...(isText && { onDblClick: handleDoubleClickText, onDblTap: handleDoubleClickText }),
        ...(isCustom && { fillPatternImage: img }),
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onClick: handleClick,
        listening: isSelected ? false : true,
      })}
    </>
  );
};

export default ShapeWrapper;
