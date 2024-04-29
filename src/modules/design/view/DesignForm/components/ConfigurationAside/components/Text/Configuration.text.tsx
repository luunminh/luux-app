import { COLOR_CODE } from '@core/common';
import { useShape } from '@design/hooks';
import { IShape } from '@design/types';
import { ActionIcon, Flex, InputWrapper, Stack } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { IoIosAdd as IncreaseIcon } from 'react-icons/io';
import { RiSubtractFill as DecreaseIcon } from 'react-icons/ri';
import { FontSelection } from '../section';

type Props = {
  id: string;
};

const ConfigurationText = ({ id }: Props) => {
  const { getShapeById, updateShape } = useShape();

  const selectedShape = getShapeById(id);
  const [fontSize, setFontSize] = useState<number>(16);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      TextStyle,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: selectedShape.attrs.content,
    onUpdate({ editor }) {
      handleChangeShape('content', editor.getHTML());
    },
  });

  const handleChangeShape = (
    key: keyof typeof selectedShape,
    value: string | number | string[] | number[] | boolean | any,
  ) => {
    const updatedShape = {
      ...selectedShape,
      attrs: {
        ...selectedShape.attrs,
        [key]: value,
      },
    } as IShape;
    updateShape(id, updatedShape);
  };

  return (
    <Stack gap={16}>
      <InputWrapper label="Font Size">
        <Flex
          align="center"
          style={{
            borderRadius: 8,
            width: 'fit-content',
            border: COLOR_CODE.BORDER_DEFAULT,
          }}
        >
          <ActionIcon
            variant="subtle"
            c="dark"
            size="xl"
            disabled={fontSize === 1}
            onClick={() => setFontSize((prev) => prev - 1)}
          >
            <DecreaseIcon size={20} color={COLOR_CODE.GRAY_800} />
          </ActionIcon>
          <Flex
            align="center"
            py={8}
            px={16}
            style={{
              fontWeight: '500',
            }}
          >
            {fontSize}
          </Flex>
          <ActionIcon
            variant="subtle"
            c="dark"
            size="xl"
            onClick={() => setFontSize((prev) => prev + 1)}
          >
            <IncreaseIcon size={20} color={COLOR_CODE.GRAY_800} />
          </ActionIcon>
        </Flex>
      </InputWrapper>
      <FontSelection selectedShape={selectedShape} onChange={handleChangeShape} />
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.ColorPicker
              colors={[
                '#25262b',
                '#868e96',
                '#fa5252',
                '#e64980',
                '#be4bdb',
                '#7950f2',
                '#4c6ef5',
                '#228be6',
                '#15aabf',
                '#12b886',
                '#40c057',
                '#82c91e',
                '#fab005',
                '#fd7e14',
              ]}
            />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Stack>
  );
};

export default ConfigurationText;
