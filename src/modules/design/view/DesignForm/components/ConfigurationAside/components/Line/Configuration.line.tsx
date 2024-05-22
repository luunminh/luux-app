import { Select, SelectOption } from '@core/components';
import { useShape } from '@design/hooks';
import { IShape } from '@design/types';
import { InputWrapper, Stack } from '@mantine/core';
type Props = {
  id: string;
};

const ConfigurationLine = ({ id }: Props) => {
  const { updateShape, getShapeById } = useShape();
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
    updateShape(selectedShape.id, updatedShape);
  };

  return (
    <Stack gap={16}>
      <InputWrapper label="Line Cap">
        <Select
          name="lineCap"
          options={linecapOptions}
          value={selectedShape.attrs.lineCap || 'butt'}
          onChange={handleChangeShape}
        />
      </InputWrapper>
    </Stack>
  );
};

const linecapOptions: SelectOption[] = [
  {
    label: 'Round',
    value: 'round',
  },
  {
    label: 'Butt',
    value: 'butt',
  },
  {
    label: 'Square',
    value: 'square',
  },
];

export default ConfigurationLine;
