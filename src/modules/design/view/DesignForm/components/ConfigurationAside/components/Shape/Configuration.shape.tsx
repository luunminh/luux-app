import { useShape } from '@design/hooks';
import { IShape } from '@design/types';
import { ColorInput, InputWrapper, Slider, Stack } from '@mantine/core';
import { LINE_TYPES } from '../../helpers';
import { BorderConfiguration, ShadowConfiguration } from '../section';

type Props = {
  id: string;
};

const ConfigurationShape = ({ id }: Props) => {
  const { getShapeById, updateShape } = useShape();

  const selectedShape = getShapeById(id);

  const colorValue = selectedShape.attrs.fill
    ? selectedShape.attrs.fill === 'black'
      ? '#000'
      : selectedShape.attrs.fill
    : '#000';

  const handleChangeShape = (
    keys: string[],
    values: (string | number | string[] | number[] | boolean | any)[],
  ) => {
    const updatedAttrs = keys.reduce((result, key, index) => {
      return { ...result, [key]: values[index] };
    }, {});

    const updatedShape = {
      ...selectedShape,
      attrs: {
        ...selectedShape.attrs,
        ...updatedAttrs,
      },
    } as IShape;
    updateShape(id, updatedShape);
  };

  return (
    <Stack>
      <InputWrapper label="Transparent">
        <Slider
          label={selectedShape.attrs.opacity * 100 || 100}
          color="blue"
          value={selectedShape.attrs.opacity * 100 || 100}
          onChange={(value) => {
            handleChangeShape(['opacity'], [Number(value) / 100]);
          }}
        />
      </InputWrapper>
      {!LINE_TYPES.includes(selectedShape.attrs.shapeType) && (
        <ColorInput
          label="Color"
          value={colorValue}
          onChange={(value) => {
            handleChangeShape(['fill'], [value]);
          }}
        />
      )}
      <BorderConfiguration selectedShape={selectedShape} onChange={handleChangeShape} />
      <ShadowConfiguration selectedShape={selectedShape} onChange={handleChangeShape} />
    </Stack>
  );
};

export default ConfigurationShape;
