/* eslint-disable react-hooks/rules-of-hooks */
import { Select, SelectOption, SelectOptionsProps } from '@components';
import { COLOR_CODE, isEmpty, useComponentDidMount, useFonts } from '@core/common';
import { useGetFontLazy, useGetFonts } from '@core/queries';
import { IShape } from '@design/types';
import { Box, Button, Flex, InputWrapper, Skeleton, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

type Props = {
  selectedShape: IShape;
  onChange: (key: string, value: any) => void;
};

const DEFAULT_FONT = 'Roboto';

const FontSelection = ({ onChange, selectedShape }: Props) => {
  const [value, setValue] = useState<string>(selectedShape.attrs?.fontFamily || DEFAULT_FONT);
  // TODO: implement lazy search
  const { fontOptions, isFetching: isFetchingFonts, fetchNextPage, hasNext } = useGetFontLazy();

  const { fonts = [], isFetching: isLoadingSelectedFont, setParams } = useGetFonts();

  const font = fonts[0];
  const formattedFont = { label: font?.name, value: font?.name, font: font };

  useEffect(() => {
    setParams({ names: [value] });
  }, [value, setParams]);

  const currentFontType = selectedShape.attrs?.fontStyle || '500';

  const handleChangeFont = (_: any, font: SelectOption) => {
    setValue(font.value);
    onChange('fontFamily', font?.value);
  };

  const isEmptyFontFiles =
    isEmpty(font?.fontUrl) ||
    (Object.values(font?.fontUrl).length === 1 && Object.keys(font?.fontUrl)[0] === 'regular');

  const isLoading = isFetchingFonts || isLoadingSelectedFont;

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
          {font.fontUrl.map(({ type, url }) => {
            if (type === 'regular') return null;
            return (
              <Button
                c="dark"
                key={type}
                size="sm"
                variant="subtle"
                style={{
                  border: type === currentFontType && `2px solid ${COLOR_CODE.ACTIVE}`,
                }}
                onClick={() => {
                  onChange('fontStyle', type);
                }}
              >
                {type}
              </Button>
            );
          })}
        </Flex>
      )}
      <Select
        value={value}
        allowLazyLoading
        isFetching={isFetchingFonts}
        hasNextPage={hasNext}
        onFetchNextPage={fetchNextPage}
        isLoading={isFetchingFonts}
        options={[formattedFont, ...fontOptions]}
        keepOptionOnChange
        onChange={handleChangeFont}
        customOptionComponent={FontSelection.Option}
      />
    </InputWrapper>
  );
};

FontSelection.Option = (props: SelectOptionsProps) => {
  const { createFontFaces, loadFontFace } = useFonts([], false);
  const [loading, setLoading] = useState(true);

  useComponentDidMount(() => {
    if (props.data.font) {
      const fontFaces = createFontFaces(props.data.font);

      Promise.all(fontFaces.map((fontFace) => loadFontFace(fontFace)))
        .then(() => {})
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  });

  if (loading) return <Skeleton {...props} height={30} width="40%%" radius="md" />;

  return (
    <Box {...props}>
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
