import { useShape } from '@design/hooks';
import { IShape } from '@design/types';
import { ColorInput, InputWrapper, Slider, Stack } from '@mantine/core';
import { BorderConfiguration, ShadowConfiguration } from '../section';

type Props = {
  id: string;
};

const ConfigurationShape = ({ id }: Props) => {
  const { getShapeById, updateShape } = useShape();

  const selectedShape = getShapeById(id);

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
    <Stack>
      <InputWrapper label="Transparent">
        <Slider
          label={selectedShape.attrs.opacity * 100}
          color="blue"
          value={selectedShape.attrs.opacity * 100 || 100}
          onChange={(value) => {
            handleChangeShape('opacity', Number(value) / 100);
          }}
        />
      </InputWrapper>
      <ColorInput
        label="Color"
        value={selectedShape.attrs.fill as string}
        onChange={(value) => {
          handleChangeShape('fill', value);
        }}
      />
      <BorderConfiguration selectedShape={selectedShape} onChange={handleChangeShape} />
      <ShadowConfiguration selectedShape={selectedShape} onChange={handleChangeShape} />
    </Stack>
  );
};

export default ConfigurationShape;
