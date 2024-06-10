import { isEmpty } from '@core/common';
import { Button, Card, Grid, Loader, Stack, Text, TextInput, Tooltip } from '@mantine/core';
import {
  GetTemplatesLazyResponse,
  useGetTemplatesLazy,
} from '@modules/design/queries/template/getTemplatesLazy';
import { usePage } from '@modules/design/view/DesignForm/hooks';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import { ChangeEvent, PropsWithChildren, useEffect } from 'react';

const TemplateSection = () => {
  const { templates, isFetching, setParams, inputSearch, setInputSearch, hasNext, fetchNextPage } =
    useGetTemplatesLazy();
  const { data } = useDesignStore();

  useEffect(() => {
    setParams((prev) => ({ ...prev, screenSizeId: data.screenSizeId }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.screenSizeId]);

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

    if (isEmpty(templates)) {
      const message = inputSearch
        ? `Sorry, we couldn’t find any results for “${inputSearch}”. Try searching something related.`
        : 'No templates found';
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

    return templates.map((template) => (
      <Grid.Col key={template.id} span={6}>
        <TemplateWrapper template={template}>
          <Tooltip label="Insert this template" withArrow>
            <img
              src={template.thumbnailUrl}
              alt={template.name}
              loading="lazy"
              className="w-auto max-h-64 h-full object-contain"
              style={{ width: '-webkit-fill-available' }}
            />
          </Tooltip>
        </TemplateWrapper>
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

type TemplateWrapperProps = PropsWithChildren & {
  template: GetTemplatesLazyResponse;
};

const TemplateWrapper = ({ template, children }: TemplateWrapperProps) => {
  const { insertPages } = usePage();
  const handleInsertTemplate = () => {
    insertPages(template.jsonState);
  };

  return (
    <Card
      className="max-h-64"
      shadow="sm"
      radius="sm"
      padding={0}
      style={{ cursor: 'pointer' }}
      onClick={handleInsertTemplate}
    >
      {children}
    </Card>
  );
};

export default TemplateSection;
