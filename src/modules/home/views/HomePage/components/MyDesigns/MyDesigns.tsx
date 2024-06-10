/* eslint-disable jsx-a11y/anchor-is-valid */
import { LoadingContainer, TableSearch } from '@components';
import {
  CommonQueryKey,
  TableQueryParams,
  formatDate,
  getFullName,
  getStandForName,
  isEmpty,
} from '@core/common';
import { useGetScreenSizeList } from '@core/queries';
import {
  ActionIcon,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Loader,
  Select,
  SelectProps,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  DesignQueryKeys,
  DesignUserType,
  GetDesignsParams,
  IGetDesigns,
  useGetDesignsLazy,
} from '@modules/design/queries';
import { designPaths } from '@modules/design/route';
import { useCallback, useEffect, useMemo } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { IoFolder, IoRefresh, IoTimeOutline } from 'react-icons/io5';
import { MdArrowUpward, MdOutlineArrowDownward } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { HomePageTabEnum } from '../../HomePage.helpers';
import CustomSidebar, { MenuItemType } from '../SideBar';

import './my-designs.scss';

type Props = {
  designsHook: ReturnType<typeof useGetDesignsLazy>;
};

const MyDesigns = () => {
  const designsHook = useGetDesignsLazy();
  const { hasNext, fetchNextPage, designs, isFetching } = designsHook;

  const renderContent = useCallback(() => {
    if (isEmpty(designs)) {
      return (
        <Title order={2} c="gray" mt={40}>
          No designs found
        </Title>
      );
    }

    return designs.map((design) => (
      <Grid.Col key={design.id} span={4}>
        <DesignItem design={design} />
      </Grid.Col>
    ));
  }, [designs]);

  if (isFetching) {
    return (
      <Stack p={16} justify="center" align="center" w="100%">
        <Loader />
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      <MyDesignsActions designsHook={designsHook} />
      <Grid>{renderContent()}</Grid>
      {hasNext && (
        <Button onClick={() => fetchNextPage()} color="blue">
          Load more
        </Button>
      )}
    </Stack>
  );
};

const DesignItem = ({ design }: { design: IGetDesigns }) => {
  const users = [design.createdByUser, ...design.sharedUsers];

  const previewUsers = users.slice(0, 3);
  const restUserNames = users.slice(3).map((user) => <p key={user.id}>{getFullName(user)}</p>);

  const navigateToEdit = () => {
    window.open(`/${designPaths.design}/${design.id}`, '_blank');
  };

  return (
    <Card shadow="lg" className="hover:scale-105 transition-all">
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{design.title}</Text>
        <AvatarGroup>
          {previewUsers.map((user) => (
            <Tooltip withArrow key={user.id} label={getFullName(user)}>
              <Avatar size="md">{getStandForName(user)}</Avatar>
            </Tooltip>
          ))}
          {!isEmpty(restUserNames) && (
            <Tooltip label={restUserNames}>
              <Avatar size="md">+{users.length - 4}</Avatar>
            </Tooltip>
          )}
        </AvatarGroup>
      </Group>

      <Group justify="space-between" align="end" mt="md" mb="xs">
        <Badge color="cyan">{design.screenSize.name}</Badge>
        <Text size="xs">
          Last updated: <strong>{formatDate(design.updatedAt)}</strong>
        </Text>
      </Group>

      <Button onClick={navigateToEdit} variant="gradient" fullWidth mt="md" radius="md">
        Explore
      </Button>
    </Card>
  );
};

const sortOptions = [
  { label: 'Newest edited', value: 'updatedAt:desc', icon: <IoTimeOutline size={16} /> },
  { label: 'Oldest edited', value: 'updatedAt:asc', icon: <IoTimeOutline size={16} /> },
  { label: '(Alphabetical) A-Z', value: 'title:desc', icon: <MdArrowUpward size={16} /> },
  { label: '(Alphabetical) Z-A', value: 'title:asc', icon: <MdOutlineArrowDownward size={16} /> },
];

const renderSortOption: SelectProps['renderOption'] = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {/* @ts-ignore */}
    {option.icon}
    {option.label}
  </Group>
);

const MyDesignsActions = ({ designsHook }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { screenSizeList, isFetching: isFetchingScreenSize } = useGetScreenSizeList({
    enabled: true,
  });

  const { setParams, params, handleInvalidateDesigns } = designsHook;

  const { search, sort, screenSizeId, owner } = useMemo(
    () => ({
      search: searchParams.get(TableQueryParams.SEARCH) || '',
      sort: searchParams.get(TableQueryParams.SORT) || 'updatedAt:desc',
      screenSizeId: searchParams.get(DesignQueryKeys.SCREEN_SIZE) || '',
      owner: searchParams.get(DesignQueryKeys.OWNER_TYPE) || DesignUserType.OWNER,
    }),
    [searchParams],
  );

  const handleTriggerAction = useCallback(() => {
    const newParams: GetDesignsParams = {
      search: search || '',
      order: sort || 'updatedAt:desc',
      type: owner as DesignUserType,
      screenSizeId: screenSizeId || '',
    };
    setParams({ ...params, ...newParams });
  }, [setParams, params, search, sort, screenSizeId, owner]);

  useEffect(() => {
    handleTriggerAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSortChange = useCallback(
    (value: string) => {
      searchParams.set(TableQueryParams.SORT, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

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

  if (isFetchingScreenSize) {
    return <LoadingContainer />;
  }

  return (
    <Flex align="center" justify="space-between">
      <Flex gap={8} align="center">
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
        <Select
          placeholder="Sort by"
          value={sort}
          data={sortOptions as any}
          renderOption={renderSortOption}
          onChange={(value) => handleSortChange(value)}
        />
      </Flex>
      <Flex gap={8} align="center" justify="end">
        <ActionIcon
          variant="outline"
          c="gray"
          size="lg"
          radius="lg"
          onClick={handleInvalidateDesigns}
        >
          <IoRefresh size={20} />
        </ActionIcon>
        <TableSearch placeholder="Search by name" />
      </Flex>
    </Flex>
  );
};

export const MyDesignsSidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const [query] = useSearchParams();

  const currentTab = query.get(CommonQueryKey.TAB) || HomePageTabEnum.DESIGNS;
  const isDesignTab = currentTab === HomePageTabEnum.DESIGNS;
  const isTemplateTab = currentTab === HomePageTabEnum.TEMPLATES;

  const ownerType = query.get(DesignQueryKeys.OWNER_TYPE) || DesignUserType.OWNER;

  const handleChangeOwnerType = (type: DesignUserType) => {
    let newSearchParams = new URLSearchParams();
    newSearchParams.set(CommonQueryKey.TAB, HomePageTabEnum.DESIGNS);
    newSearchParams.set(DesignQueryKeys.OWNER_TYPE, type);
    setSearchParams(newSearchParams);
  };

  const handleMoveToTemplate = () => {
    let newSearchParams = new URLSearchParams();
    newSearchParams.set(CommonQueryKey.TAB, HomePageTabEnum.TEMPLATES);
    setSearchParams(newSearchParams);
  };

  const MenuItems: MenuItemType[] = [
    {
      label: 'MY DESIGNS',
      isActive: false,
      subItems: [
        {
          label: 'All Designs',
          isActive: isDesignTab && ownerType === DesignUserType.OWNER,
          icon: <IoFolder size={14} />,
          onClick: () => handleChangeOwnerType(DesignUserType.OWNER),
        },
        {
          label: 'Create folder',
          isActive: false,
          icon: <IoIosAddCircle size={17} />,
          disabled: true,
        },
      ],
    },
    {
      label: 'MY TEAM',
      isActive: false,
      subItems: [
        {
          label: 'Create team',
          isActive: false,
          icon: <IoIosAddCircle size={17} />,
          disabled: true,
        },
      ],
    },
    {
      label: 'TEMPLATES',
      isActive: isTemplateTab,
      onClick: () => handleMoveToTemplate(),
    },
    {
      label: 'SHARED WITH ME',
      isActive: isDesignTab && ownerType === DesignUserType.SHARED,
      onClick: () => handleChangeOwnerType(DesignUserType.SHARED),
    },
    {
      label: 'MY DRAFTS',
      isActive: false,
      disabled: true,
    },
  ];

  return <CustomSidebar menuItems={MenuItems} />;
};

export default MyDesigns;
