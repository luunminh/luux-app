import { useShape } from '@design/hooks';
import { IShape } from '@design/types';
import { ColorInput, Grid, InputWrapper } from '@mantine/core';
import { useState } from 'react';

type Props = {
  id: string;
};

const ConfigurationCustomShape = ({ id }: Props) => {
  const { getShapeById, updateShape } = useShape();

  const selectedShape = getShapeById(id);
  const [colors, setColors] = useState<string[]>(selectedShape?.attrs?.colors || []);

  const handleChangeShape = (
    key: keyof typeof selectedShape,
    value: string | number | string[] | number[] | boolean | any,
  ) => {
    const updatedShape = {
      ...selectedShape,
      attrs: {
        ...selectedShape?.attrs,
        [key]: value,
      },
    } as IShape;
    updateShape(selectedShape.id, updatedShape);
  };

  return (
    <InputWrapper label="Colors">
      <Grid>
        {colors.map((color, index) => (
          <Grid.Col span={6} key={`${color}-${index}`}>
            <ColorInput
              value={color}
              onChange={(value) => {
                const updatedColors = colors.map((c, idx) => {
                  if (idx === index) return value;
                  return c;
                });
                setColors(updatedColors);
                handleChangeShape('colors', updatedColors);
              }}
            />
          </Grid.Col>
        ))}
      </Grid>
    </InputWrapper>
  );
};

export default ConfigurationCustomShape;
