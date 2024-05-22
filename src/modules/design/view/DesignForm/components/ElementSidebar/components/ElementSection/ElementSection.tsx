import { Button, Grid, Image, Loader, Stack, Text, TextInput } from '@mantine/core';
import { useGetElementsLazy } from '@modules/design/queries';
import { isEmpty } from 'lodash';
import { ChangeEvent, useEffect } from 'react';
import { ItemWrapper } from '..';

type Props = {
  categoryId: string;
};

const ElementSection = ({ categoryId }: Props) => {
  const { elements, isFetching, setParams, inputSearch, setInputSearch, hasNext, fetchNextPage } =
    useGetElementsLazy();

  useEffect(() => {
    setParams((prev) => ({ ...prev, categoryIds: [categoryId] }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputSearch(val);
  };

  const renderContent = () => {
    if (isFetching) {
      return (
        <Stack p={16} justify="center" align="center" w="100%">
          <Loader />
        </Stack>
      );
    }

    if (isEmpty(elements)) {
      const message = inputSearch
        ? `Sorry, we couldn’t find any results for “${inputSearch}”. Try searching something related.`
        : 'No elements found';
      return (
        <Stack p={16} justify="center" align="center" w="100%">
          <Text
            style={{
              p: 8,
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            {message}
          </Text>
        </Stack>
      );
    }

    return elements.map((element) => (
      <Grid.Col key={element.id} span={4}>
        <ItemWrapper element={element}>
          <Image
            radius="md"
            loading="lazy"
            src={element.thumbnailUrl}
            alt={element.name}
            height={80}
          />
        </ItemWrapper>
      </Grid.Col>
    ));
  };

  return (
    <Stack gap={16} p={16} w="100%">
      <Grid style={{ width: '100%' }}>
        <Grid.Col span={12}>
          <TextInput
            placeholder="Search by placeholder name"
            value={inputSearch}
            onChange={handleChangeSearch}
          />
        </Grid.Col>
        {renderContent()}
        {hasNext && (
          <Grid.Col span={12}>
            <Button onClick={() => fetchNextPage()}>See more...</Button>
          </Grid.Col>
        )}
      </Grid>
    </Stack>
  );
};

export default ElementSection;
