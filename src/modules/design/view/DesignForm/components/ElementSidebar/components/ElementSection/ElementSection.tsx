import { getRandomId } from '@core/common';
import { useShape } from '@design/hooks';
import { IShape, ShapeTypeEnum } from '@design/types';
import { Button, Card, Grid, Loader, Stack, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { useGetElementsLazy } from '@modules/design/queries';
import { isEmpty } from 'lodash';
import { ChangeEvent, ReactElement, useEffect } from 'react';
import { ItemWrapper } from '..';
import { ElementSidebarTabEnum } from '../../ElementSidebar.helpers';

type Props = {
  categoryId: string;
  type: ElementSidebarTabEnum;
};

const DEFAULT_TEXTS: { label: ReactElement; metadata: IShape['attrs'] }[] = [
  {
    label: (
      <Title order={3} className="text-4xl font-semibold">
        Add a heading
      </Title>
    ),
    metadata: {
      shapeType: ShapeTypeEnum.TEXT,
      y: 300,
      x: 300,
      width: 600,
      fontSize: 90,
      fontFamily: 'Roboto',
      scale: { x: 1, y: 1 },
      text: 'Add a heading',
    },
  },
  {
    label: (
      <Title order={5} className="text-2xl font-medium">
        Add a subheading
      </Title>
    ),
    metadata: {
      shapeType: ShapeTypeEnum.TEXT,
      y: 300,
      x: 300,
      width: 400,
      fontSize: 50,
      fontFamily: 'Roboto',
      scale: { x: 1, y: 1 },
      text: 'Add a subheading',
    },
  },
  {
    label: (
      <Title order={6} className="text-lg font-normal">
        Add a little bit of body text
      </Title>
    ),
    metadata: {
      shapeType: ShapeTypeEnum.TEXT,
      y: 300,
      x: 300,
      width: 360,
      fontSize: 30,
      fontFamily: 'Akatab',
      fontStyle: 'normal',
      scale: { x: 1, y: 1 },
      text: 'Add a little bit of body text',
    },
  },
];

const ElementSection = ({ categoryId, type }: Props) => {
  const { addShape } = useShape();

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

  const handleAddElement = (element: IShape['attrs']) => {
    addShape({
      id: getRandomId(),
      attrs: element,
    } as IShape);
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
      <Grid.Col key={element.id} span={6}>
        <ItemWrapper element={element}>
          <Tooltip label={`Insert "${element.name}"`} withArrow>
            <img
              loading="lazy"
              src={element.thumbnailUrl}
              alt={element.name}
              className="w-auto h-36 h-full object-contain"
              style={{ width: '-webkit-fill-available' }}
            />
          </Tooltip>
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
        {type === ElementSidebarTabEnum.TEXT && (
          <>
            <Text className="text-sm mt-2 font-medium">Default Text styles</Text>
            {DEFAULT_TEXTS.map((elm) => (
              <Grid.Col key={elm.metadata.text} className="mb-2" span={12}>
                <Card
                  mah={144}
                  h="100%"
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleAddElement(elm.metadata)}
                >
                  {elm.label}
                </Card>
              </Grid.Col>
            ))}
          </>
        )}

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
