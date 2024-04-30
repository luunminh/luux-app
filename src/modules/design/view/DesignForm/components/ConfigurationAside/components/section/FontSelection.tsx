/* eslint-disable react-hooks/rules-of-hooks */
import { COLOR_CODE, isEmpty, useFonts } from '@core/common';
import { Select, SelectOption, SelectOptionsProps } from '@core/components';
import { IFont, useGetFont, useGetFonts } from '@core/queries';
import { IShape } from '@design/types';
import { Box, Button, Flex, InputWrapper, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

type Props = {
  selectedShape: IShape;
  onChange: (key: string, value: any) => void;
};

const DEFAULT_FONT = 'Roboto';

const FontSelection = ({ onChange, selectedShape }: Props) => {
  const [value, setValue] = useState<string>(selectedShape.attrs?.fontFamily || DEFAULT_FONT);
  const { fonts = [], isLoadingFonts } = useGetFonts();

  const currentFontType = selectedShape.attrs?.fontStyle || '500';

  const { font, isLoadingFont } = useGetFont({ fontName: value });

  const handleChangeFont = (_: any, font: SelectOption) => {
    setValue(font.value);
    onChange('fontFamily', font?.value);
  };

  const isEmptyFontFiles =
    isEmpty(font?.files) ||
    (Object.values(font?.files).length === 1 && Object.keys(font?.files)[0] === 'regular');

  return (
    <InputWrapper label="Font family">
      {!isEmptyFontFiles && (
        <Flex
          p={16}
          mt={8}
          mb={16}
          gap={16}
          wrap="wrap"
          justify="center"
          style={{
            borderRadius: 12,
            border: COLOR_CODE.BORDER_DEFAULT,
          }}
        >
          {Object.entries(font.files).map(([fontType]) => {
            if (fontType === 'regular') return null;
            return (
              <Button
                c="dark"
                key={fontType}
                size="sm"
                variant="subtle"
                style={{
                  border: fontType === currentFontType && `2px solid ${COLOR_CODE.ACTIVE}`,
                }}
                onClick={() => {
                  onChange('fontStyle', fontType);
                }}
              >
                {fontType}
              </Button>
            );
          })}
        </Flex>
      )}
      <Select
        value={value}
        isLoading={isLoadingFonts || isLoadingFont}
        options={mapFontOptions([...fonts, font])}
        keepOptionOnChange
        onChange={handleChangeFont}
        customOptionComponent={FontSelection.Option}
      />
    </InputWrapper>
  );
};

const mapFontOptions = (fonts: IFont[]) =>
  fonts.map((font) => ({
    label: font?.family,
    value: font?.family,
    font: font,
  }));

FontSelection.Option = (props: SelectOptionsProps) => {
  const { createFontFaces, loadFontFace } = useFonts([], false);

  useEffect(() => {
    if (props.data.font) {
      const fontFaces = createFontFaces(props.data.font);

      Promise.all(fontFaces.map((fontFace) => loadFontFace(fontFace)))
        .then(() => {
          console.log('All fonts have been loaded');
        })
        .catch((error) => {
          console.error('Error loading fonts:', error);
        });
    }
  }, [createFontFaces, loadFontFace, props.data]);

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
