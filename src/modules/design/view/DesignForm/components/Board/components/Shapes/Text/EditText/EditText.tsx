import { Callback } from '@core/common';
import { BaseShape, ShapeTypeEnum } from '@modules/design/view/DesignForm/types';
import Konva from 'konva';
import { CSSProperties, forwardRef, useEffect, useRef } from 'react';
import { Html } from 'react-konva-utils';

type Props = BaseShape[ShapeTypeEnum.TEXT] & {
  onChange: Callback;
  onKeyDown: Callback;
  onClickOutside: Callback;
};

function getStyle(width: number, height: number) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  const baseStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    border: 'none',
    padding: '0px',
    margin: '0px',
    background: 'none',
    outline: 'none',
    resize: 'none',
    color: 'black',
    fontSize: '24px',
    fontFamily: 'sans-serif',
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
  };
}

const EditText = forwardRef<Konva.Text, Props>(
  ({ fontFamily, onChange, onKeyDown, onClickOutside, ...props }: Props, ref) => {
    const textRef = useRef(null);

    //@ts-ignore
    const konvaText = ref?.current;
    const fontSize = konvaText?.fontSize() * konvaText?.scaleX();
    const textHeight = konvaText?.height() * konvaText?.scaleY();
    const textWidth = konvaText?.width() * konvaText?.scaleX();
    const color = konvaText?.fill();
    const padding = konvaText?.padding() || 0;

    const style = {
      ...getStyle(props.width, props.height),
      fontFamily: fontFamily || 'sans-serif',
      fontSize: fontSize || '16px',
      lineHeight: props.lineHeight || 1,
      width: `calc(${textWidth}px - ${2 * padding}px)`,
      height: `calc(${textHeight}px - ${2 * padding}px)`,
      color: color || 'black',
      padding: `${padding}px`,
      overflowY: 'hidden',
    } as CSSProperties;

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (textRef.current && e.target !== textRef.current) {
          onClickOutside(e);
        }
      };

      if (textRef.current) {
        const length = textRef.current.value.length;
        textRef.current.focus();
        textRef.current.setSelectionRange(length, length);
        window.addEventListener('click', handleClickOutside);
      }

      return () => {
        window.removeEventListener('click', handleClickOutside);
      };
    }, [onClickOutside]);

    return (
      <Html groupProps={{ x: props?.x, y: props?.y }} divProps={{ style: { opacity: 1 } }}>
        <textarea
          ref={textRef}
          //@ts-ignore
          value={props.text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          style={style}
        />
      </Html>
    );
  },
);
export default EditText;
