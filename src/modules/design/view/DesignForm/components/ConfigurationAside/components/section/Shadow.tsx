import { COLOR_CODE } from '@core/common';
import { IShape } from '@design/types';
import { ColorInput, Grid, InputWrapper, Slider, Stack } from '@mantine/core';

type Props = {
  selectedShape: IShape;
  onChange: (keys: string[], values: any[]) => void;
};

const ShadowConfiguration = ({ selectedShape, onChange }: Props) => {
  return (
    <InputWrapper label="Shadow">
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
        <ColorInput
          label="Color"
          value={(selectedShape.attrs.shadowColor as string) || '#000'}
          onChange={(value) => {
            onChange(['shadowColor'], [value]);
          }}
        />
        <InputWrapper label="Blur">
          <Slider
            label={selectedShape.attrs.shadowBlur}
            color="blue"
            value={selectedShape.attrs.shadowBlur}
            onChange={(value) => {
              onChange(['shadowBlur'], [Number(value)]);
            }}
          />
        </InputWrapper>
        <InputWrapper label="Opacity">
          <Slider
            label={selectedShape.attrs.shadowOpacity * 100}
            color="blue"
            value={selectedShape.attrs.shadowOpacity * 100}
            onChange={(value) => {
              onChange(['shadowOpacity'], [Number(value) / 100]);
            }}
          />
        </InputWrapper>
        <Grid>
          <Grid.Col span={6}>
            <InputWrapper label="Offset X">
              <Slider
                min={-100}
                max={100}
                label={selectedShape.attrs.shadowOffsetX}
                color="blue"
                value={selectedShape.attrs.shadowOffsetX || 0}
                onChange={(value) => {
                  onChange(['shadowOffsetX'], [value]);
                }}
              />
            </InputWrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <InputWrapper label="Offset Y">
              <Slider
                min={-100}
                max={100}
                label={selectedShape.attrs.shadowOffsetY}
                color="blue"
                value={selectedShape.attrs.shadowOffsetY || 0}
                onChange={(value) => {
                  onChange(['shadowOffsetY'], [value]);
                }}
              />
            </InputWrapper>
          </Grid.Col>
        </Grid>
      </Stack>
    </InputWrapper>
  );
};

export default ShadowConfiguration;
