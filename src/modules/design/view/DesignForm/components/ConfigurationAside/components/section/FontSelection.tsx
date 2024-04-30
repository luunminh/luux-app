/* eslint-disable react-hooks/rules-of-hooks */
import useFonts from '@core/common/hooks/useFonts';
import { Select, SelectOption, SelectOptionsProps } from '@core/components';
import { IFont, useGetFonts } from '@core/queries';
import { IShape } from '@design/types';
import { Box, InputWrapper, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

type Props = {
  selectedShape: IShape;
  onChange: (key: string, value: any) => void;
};

const FontSelection = ({ onChange, selectedShape }: Props) => {
  const [value, setValue] = useState(selectedShape.attrs?.fontFamily);
  const { fonts = [], isLoadingFonts } = useGetFonts();

  const handleChangeFontSize = (_: any, font: SelectOption) => {
    setValue(font.value);
    onChange('fontFamily', font?.value);
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
    value: font.family,
    font: font,
  }));

FontSelection.Option = (props: SelectOptionsProps) => {
  const { createFontFace, loadFontFace } = useFonts([], false);

  useEffect(() => {
    if (props.data.font) {
      const fontFace = createFontFace(props.data.font);
      loadFontFace(fontFace);
    }
  }, [createFontFace, loadFontFace, props.data]);

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
