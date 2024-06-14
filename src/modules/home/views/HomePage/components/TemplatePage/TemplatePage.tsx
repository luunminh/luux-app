import { LoadingContainer, TableSearch } from '@components';
import { TableQueryParams, ToastService, isEmpty } from '@core/common';
import { useGetScreenSizeList, useProfile } from '@core/queries';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Loader,
  Menu,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import {
  DesignQueryKeys,
  GetTemplatesLazyParams,
  TemplateQueryKeys,
  useCreateDesign,
  useDeleteTemplate,
  useGetTemplatesLazy,
} from '@modules/design/queries';
import { designPaths } from '@modules/design/route';
import { DEFAULT_DESIGN, IDesignContent } from '@modules/design/view/DesignForm';
import { useCallback, useEffect, useMemo } from 'react';
import { IoIosMore } from 'react-icons/io';
import { IoRefresh } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';

const TemplateContent = ({ templatesHook }: Props) => {
  const { templates, fetchNextPage, hasNext, isFetching } = templatesHook;
  const {
    profile: { id },
  } = useProfile();

  const { onCreateDesign } = useCreateDesign({
    onSuccess: ({ data }) => {
      window.open(`/${designPaths.design}/${data}`, '_blank');
    },
  });

  const { onDeleteTemplate, isLoading: isDeletingTemplate } = useDeleteTemplate({
    onSuccess: () => {
      ToastService.success('Template deleted successfully');
      templatesHook.handleInvalidateTemplates();
    },
    onError: () => {
      ToastService.error('Failed to delete template');
    },
  });

  const handleCreateDesign = (screenSizeId: string, contentData: IDesignContent[]) => {
    const data = DEFAULT_DESIGN({ screenSizeId, userId: id });

    onCreateDesign({ ...data, metadata: contentData });
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
      return (
        <Title order={2} c="gray" mt={40}>
          No templates found
        </Title>
      );
    }

    return templates.map((template) => (
      <Grid.Col key={template.id} span={4}>
        <Card shadow="lg">
          <Card.Section>
            <img
              className="object-contain max-h-56 w-full"
              src={template.thumbnailUrl}
              alt={template.thumbnailUrl}
            />
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{template.name}</Text>
            <Badge color="cyan">{template.screenSize.name}</Badge>
          </Group>

          <Grid>
            <Grid.Col span={10}>
              <Button
                onClick={() => handleCreateDesign(template.screenSize.id, template.jsonState)}
                variant="gradient"
                fullWidth
                mt="md"
                radius="md"
              >
                Try it now
              </Button>
            </Grid.Col>
            <Grid.Col span={2} className="flex justify-center items-center">
              <Menu width={150}>
                <Menu.Target>
                  <ActionIcon variant="outline" radius="lg" mt="md">
                    <IoIosMore size={18} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => onDeleteTemplate({ id: template.id })}
                    disabled={!(template.createdByUser.id === id) || isDeletingTemplate}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>
    ));
  };

  if (isFetching) {
    return (
      <Stack p={16} justify="center" align="center" w="100%">
        <Loader />
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      <Grid>{renderContent()}</Grid>
      {hasNext && (
        <Button onClick={() => fetchNextPage()} color="blue">
          Load more
        </Button>
      )}
    </Stack>
  );
};
type Props = {
  templatesHook: ReturnType<typeof useGetTemplatesLazy>;
};

const TemplateActions = ({ templatesHook }: Props) => {
  const { setParams, params, handleInvalidateTemplates } = templatesHook;

  const {
    profile: { id },
  } = useProfile();

  const [searchParams, setSearchParams] = useSearchParams();

  const { screenSizeList, isFetching: isFetchingScreenSize } = useGetScreenSizeList({
    enabled: true,
  });

  const { search, screenSizeId, userId } = useMemo(
    () => ({
      search: searchParams.get(TableQueryParams.SEARCH) || '',
      screenSizeId: searchParams.get(TemplateQueryKeys.SCREEN_SIZE) || '',
      userId: searchParams.get(TemplateQueryKeys.USER_ID) || '',
    }),
    [searchParams],
  );

  const handleTriggerAction = useCallback(() => {
    const newParams: GetTemplatesLazyParams = {
      search: search || '',
      userId: userId || '',
      screenSizeId: screenSizeId || '',
    };
    setParams({ ...params, ...newParams });
  }, [search, userId, screenSizeId, setParams, params]);

  useEffect(() => {
    handleTriggerAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleScreenSizeChange = useCallback(
    (value: string) => {
      if (isEmpty(value)) {
        searchParams.delete(DesignQueryKeys.SCREEN_SIZE);
      } else {
        searchParams.set(DesignQueryKeys.SCREEN_SIZE, value);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const handleOwnerChange = useCallback(
    (value: boolean) => {
      if (!value) {
        searchParams.delete(TemplateQueryKeys.USER_ID);
      } else {
        searchParams.set(TemplateQueryKeys.USER_ID, id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, id],
  );

  if (isFetchingScreenSize) {
    return <LoadingContainer />;
  }

  return (
    <Flex align="center" justify="space-between">
      <Flex gap={16} align="center">
        <Select
          clearable
          placeholder="Category"
          value={screenSizeId}
          data={screenSizeList.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={(value) => handleScreenSizeChange(value)}
        />
        <Switch
          label="My templates"
          checked={!isEmpty(userId)}
          onChange={(event) => handleOwnerChange(event.currentTarget.checked)}
        />
      </Flex>
      <Flex gap={8} align="center" justify="end">
        <ActionIcon
          variant="outline"
          c="gray"
          size="lg"
          radius="lg"
          onClick={handleInvalidateTemplates}
        >
          <IoRefresh size={20} />
        </ActionIcon>
        <TableSearch placeholder="Search by name" />
      </Flex>
    </Flex>
  );
};

const TemplatePage = () => {
  const templatesHook = useGetTemplatesLazy();
  return (
    <Stack gap="md">
      <TemplateActions templatesHook={templatesHook} />
      <TemplateContent templatesHook={templatesHook} />
    </Stack>
  );
};

export default TemplatePage;
