import { LoadingContainer } from '@components';
import { getRandomId, useComponentDidMount } from '@core/common';
import { useShape } from '@design/hooks';
import { IShape } from '@design/types';
import { Button, Grid, Image, Stack, Text, TextInput } from '@mantine/core';
import { IConvertJsonState, IElement, useGetElementsLazy } from '@modules/design/queries';
import { isEmpty } from 'lodash';
import { ChangeEvent } from 'react';
import { ItemWrapper } from '..';

type Props = {
  categoryId: string;
};

const ElementSection = ({ categoryId }: Props) => {
  const { addShapes } = useShape();
  const { elements, isFetching, setParams, inputSearch, setInputSearch, hasNext, fetchNextPage } =
    useGetElementsLazy();

  useComponentDidMount(() => {
    setParams((prev) => ({ ...prev, categoryIds: [categoryId] }));
  });

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputSearch(val);
  };

  const handleAddElement = (elm: IElement) => {
    const shapes: IShape[] = [];
    const groupId = getRandomId();
    const jsonStates: IConvertJsonState[] = JSON.parse(elm.jsonState);

    jsonStates.forEach((shapeAttrs) => {
      const id = getRandomId();
      shapes.push({
        id: id,
        attrs: {
          ...(shapeAttrs as any),
          ...(jsonStates.length > 1 && { group: groupId }),
          id,
        },
      });
    });

    addShapes(shapes);
  };

  if (isFetching) {
    return <LoadingContainer />;
  }

  const renderContent = () => {
    if (isEmpty(elements)) {
      return (
        <Text
          style={{
            p: 8,
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          Sorry, we couldn’t find any results for “{inputSearch}”. Try searching something related.
        </Text>
      );
    }

    return elements.map((element) => (
      <Grid.Col key={element.id} span={4}>
        <ItemWrapper
          onClickItem={() => {
            handleAddElement(element);
          }}
        >
          <Image
            radius="md"
            loading="lazy"
            src={element.thumbnailUrl}
            alt={element.name}
            width="90%"
            mah={70}
          />
        </ItemWrapper>
      </Grid.Col>
    ));
  };

  return (
    <Stack gap={16} p={16} w="100%">
      <Grid style={{ width: '100%' }}>
        <Grid.Col span={12}>
          <TextInput value={inputSearch} onChange={handleChangeSearch} />
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
