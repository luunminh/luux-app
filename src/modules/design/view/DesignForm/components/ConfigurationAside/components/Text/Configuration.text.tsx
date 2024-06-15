import { useShape } from '@design/hooks';
import { IShape } from '@design/types';
import { InputWrapper, Slider, Stack } from '@mantine/core';
import { useCallback } from 'react';
import { FontSelection, FontSizeConfiguration } from '../section';

type Props = {
  id: string;
};

const ConfigurationText = ({ id }: Props) => {
  const { getShapeById, updateShape } = useShape();

  const selectedShape = getShapeById(id);

  const handleChangeShape = useCallback(
    (
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
    },
    [selectedShape, updateShape, id],
  );

  return (
    <Stack gap={16}>
      <FontSizeConfiguration selectedShape={selectedShape} onChange={handleChangeShape} />
      <FontSelection selectedShape={selectedShape} onChange={handleChangeShape} />
      <InputWrapper label="Letter spacing">
        <Slider
          label={selectedShape?.attrs?.letterSpacing || 0}
          color="blue"
          min={0}
          max={100}
          value={selectedShape?.attrs?.letterSpacing || 0}
          onChange={(value) => {
            handleChangeShape('letterSpacing', value);
          }}
        />
      </InputWrapper>
    </Stack>
  );
};

export default ConfigurationText;
