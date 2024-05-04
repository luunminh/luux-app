import { useShape } from '@design/hooks';
import { IShape } from '@design/types';
import { Grid, InputWrapper, Slider, Stack } from '@mantine/core';

type Props = {
  id: string;
};

const BASE_PATTERN_SCALE = { x: 0.15, y: 0.15 };

const ConfigurationImageFrame = ({ id }: Props) => {
  const { updateShape, getShapeById } = useShape();
  const selectedShape = getShapeById(id);

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
    <Stack gap={16}>
      <InputWrapper label="Image size">
        <Slider
          min={0}
          max={1}
          step={0.01}
          color="blue"
          label={selectedShape.attrs?.fillPatternScaleX || BASE_PATTERN_SCALE.x}
          value={selectedShape.attrs?.fillPatternScaleX || BASE_PATTERN_SCALE.x}
          onChange={(value) => {
            handleChangeShape(['fillPatternScale'], [{ x: value, y: value }]);
          }}
        />
      </InputWrapper>
      <InputWrapper label="Offset">
        <Grid>
          <Grid.Col span={6}>
            <Slider
              color="blue"
              min={-1000}
              max={1000}
              label={selectedShape.attrs?.fillPatternOffsetX || 0}
              value={selectedShape.attrs?.fillPatternOffsetX || 0}
              onChange={(value) => {
                handleChangeShape(['fillPatternOffsetX'], [value]);
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Slider
              color="blue"
              min={-1000}
              max={1000}
              label={selectedShape.attrs?.fillPatternOffsetY || 0}
              value={selectedShape.attrs?.fillPatternOffsetY || 0}
              onChange={(value) => {
                handleChangeShape(['fillPatternOffsetY'], [value]);
              }}
            />
          </Grid.Col>
        </Grid>
      </InputWrapper>
    </Stack>
  );
};

export default ConfigurationImageFrame;
