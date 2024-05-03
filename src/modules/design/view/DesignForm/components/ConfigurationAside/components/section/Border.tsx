import { COLOR_CODE } from '@core/common';
import { IShape } from '@design/types';
import { ActionIcon, ColorInput, Flex, InputWrapper, Slider, Stack, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { AiOutlineDash } from 'react-icons/ai';
import { GrSubtract } from 'react-icons/gr';
import { IoBanSharp } from 'react-icons/io5';
import { TbLineDotted } from 'react-icons/tb';
import { LINE_TYPES } from '../../helpers';
type Props = {
  selectedShape: IShape;
  onChange: (keys: string[], values: any[]) => void;
};

type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'none';

const BorderConfiguration = ({ selectedShape, onChange }: Props) => {
  const [activeBorderStyle, setActiveBorderStyle] = useState<BorderStyle>('solid');

  const borders = {
    none: <IoBanSharp size={30} />,
    solid: <GrSubtract size={30} />,
    dashed: <AiOutlineDash size={30} />,
    dotted: <TbLineDotted size={30} />,
  };

  const isLineType = LINE_TYPES.includes(selectedShape.attrs.shapeType);

  const handleChangeBorderStyle = (type: BorderStyle) => {
    const dashStyle: any = {
      //@ts-ignore
      solid: [],
      dotted: [0.001, 20, 0.001, 20],
      dashed: [15, 15, 15, 15],
    };
    setActiveBorderStyle(type);

    switch (type) {
      case 'dotted':
      case 'solid':
      case 'dashed':
        const keys = ['dashEnabled', 'lineCap', 'dash'];
        const values = [true, 'round', dashStyle[type]];
        onChange(keys, values);
        break;
      case 'none':
        onChange(['dashEnabled'], [false]);
        break;
    }
  };

  const colorValue = selectedShape.attrs.stroke
    ? selectedShape.attrs.stroke === 'black'
      ? '#000'
      : selectedShape.attrs.stroke
    : '#000';

  return (
    <InputWrapper label={isLineType ? 'Color' : 'Border'}>
      <Stack
        mt={4}
        gap={16}
        px={16}
        py={24}
        style={{
          borderRadius: 12,
          border: COLOR_CODE.BORDER_DEFAULT,
        }}
      >
        <Flex gap={16}>
          {Object.entries(borders).map(([borderType, icon]) => (
            <Tooltip key={borderType} label={borderType}>
              <ActionIcon
                c="dark"
                size="xl"
                variant="subtle"
                style={{
                  border: borderType === activeBorderStyle && `2px solid ${COLOR_CODE.ACTIVE}`,
                }}
                onClick={() => {
                  handleChangeBorderStyle(borderType as BorderStyle);
                }}
              >
                {icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
        <ColorInput
          label="Color"
          value={colorValue}
          onChange={(value) => {
            onChange(['stroke'], [value]);
          }}
        />
        <InputWrapper label="Weight">
          <Slider
            label={selectedShape.attrs.strokeWidth}
            color="blue"
            value={selectedShape.attrs.strokeWidth}
            onChange={(value) => {
              onChange(['strokeWidth'], [Number(value)]);
            }}
          />
        </InputWrapper>
        <InputWrapper label="Corner rounding">
          <Slider
            label={selectedShape.attrs.cornerRadius}
            color="blue"
            max={200}
            value={selectedShape.attrs.cornerRadius}
            onChange={(value) => {
              onChange(['cornerRadius'], [Number(value)]);
            }}
          />
        </InputWrapper>
      </Stack>
    </InputWrapper>
  );
};

export default BorderConfiguration;
