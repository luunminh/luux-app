import { useComponentDidMount, useFonts } from '@core/common';
import { useGetFonts } from '@core/queries';
import { BaseShape, ITEMS_CONTEXT, ShapeTypeEnum } from '@design/types';
import { useShape } from '@modules/design/view/DesignForm/hooks';
import Konva from 'konva';
import { forwardRef, useEffect, useState } from 'react';
import { EditText } from './EditText';
import { ResizeText } from './ResizeText';

type Props = BaseShape[ShapeTypeEnum.TEXT] & {
  onSelect: ITEMS_CONTEXT['onSelect'];
  transformer: ITEMS_CONTEXT['transformer'];
};

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

const Text = forwardRef<Konva.Text, Props>(
  ({ fontFamily, onSelect, transformer, ...props }: Props, ref) => {
    const { createFontFaces, loadFontFace } = useFonts([], false);
    const [isLoading, setLoading] = useState(true);
    const { setParams, fonts } = useGetFonts();
    const font = fonts[0];

    const { updateShape } = useShape();

    const [text, setText] = useState(props.text);
    const [isEditing, setIsEditing] = useState(false);

    useComponentDidMount(() => {
      setParams({ skip: 0, take: 10, names: [fontFamily] });
    });

    const handleChangeToViewMode = () => {
      updateShape(props.id, {
        id: props.id,
        attrs: {
          //@ts-ignore
          ...ref!.current!.attrs,
          opacity: 1,
        },
      });
      setIsEditing(false);
    };

    useEffect(() => {
      if (font) {
        const fontFaces = createFontFaces(font);

        Promise.all(fontFaces.map((fontFace) => loadFontFace(fontFace)))
          .then(() => {})
          .catch((error) => {})
          .finally(() => {
            setLoading(false);
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [font]);

    function handleEscapeKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
        setIsEditing(false);
      } else {
        e.stopPropagation();
        //@ts-ignore
        setText(e.target.value);
      }
    }

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      setText(e.target.value);
    }

    useEffect(() => {
      //@ts-ignore
      if (ref?.current) {
        //@ts-ignore
        ref.current.text(text);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    useEffect(() => {
      //@ts-ignore
      if (ref?.current) {
        //@ts-ignore
        ref.current.opacity(isEditing ? 0 : 1);
      }
    }, [isEditing, ref]);

    const handleDoubleClickShape = (e: Konva.KonvaEventObject<MouseEvent>) => {
      onSelect(e);
      setIsEditing(true);
    };

    if (isLoading) return null;

    return (
      <>
        <ResizeText
          ref={ref}
          fontFamily={fontFamily}
          {...props}
          onDblClick={handleDoubleClickShape}
        />
        {isEditing && (
          <EditText
            ref={ref}
            fontFamily={fontFamily}
            {...props}
            text={text}
            onChange={handleTextChange}
            onKeyDown={handleEscapeKeys}
            onClickOutside={handleChangeToViewMode}
          />
        )}
      </>
    );
  },
);

export default Text;
