import { Select, SelectOption, SelectOptionsProps } from '@core/components';
import { IFont, useGetFonts } from '@core/queries';
import { IShape } from '@design/types';
import { Box, InputWrapper, Text } from '@mantine/core';
import { useState } from 'react';

type Props = {
  selectedShape: IShape;
  onChange: (key: string, value: any) => void;
};

const FontSelection = ({ selectedShape, onChange }: Props) => {
  const [value, setValue] = useState(null);
  const { fonts = [], isLoadingFonts } = useGetFonts();

  const handleChangeFontSize = (_: any, font: SelectOption) => {
    setValue(font.value);
    onChange('fontFamily', font?.label);
  };

  return (
    <InputWrapper label="Font family">
      <Select
        value={value}
        isLoading={isLoadingFonts}
        options={mapFontOptions(fonts)}
        keepOptionOnChange
        onChange={handleChangeFontSize}
        customOptionComponent={FontSelection.Option}
      />
    </InputWrapper>
  );
};

const mapFontOptions = (fonts: IFont[]) =>
  fonts.map((font) => ({
    label: font.family,
    value: font.files.regular,
  }));

FontSelection.Option = (props: SelectOptionsProps) => {
  return (
    <Box>
      <Text
        style={{
          fontSize: 18,
          fontFamily: props.data.label,
        }}
      >
        {props.label}
      </Text>
    </Box>
  );
};

export default FontSelection;
