import {
  Callback,
  ToastService,
  getFullName,
  getStandForName,
  isEmpty,
  isValidEmail,
} from '@core/common';
import { Select as ReactSelect, SelectOptionsProps } from '@core/components';
import { useGetUsers } from '@core/queries/users';
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Menu,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IGetDesignUser, useCreateDesignPermission } from '@modules/design/queries';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import { useMemo, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

type Props = {
  onBack: Callback;
};

export enum UserPermission {
  VIEW = 'view',
  EDIT = 'edit',
  OWNER = 'owner',
}

const permissionOptions = [
  { value: UserPermission.VIEW, label: 'View' },
  { value: UserPermission.EDIT, label: 'Edit' },
];

const CustomOptionCmp = (props: SelectOptionsProps) => {
  return (
    <Group c={'gray'} p={8} align="start">
      <Avatar src="image.png" size="sm" radius="xl">
        {getStandForName(props.data.data)}
      </Avatar>
      <Stack gap={0}>
        <Title order={6}>{getFullName(props.data.data)}</Title>
        <Text size="xs">{props.data.data.email}</Text>
      </Stack>
    </Group>
  );
};

const PeopleAccess = ({ onBack }: Props) => {
  const { data } = useDesignStore();

  const { users, setParams, isFetching: isFetchingUsers } = useGetUsers({});

  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        data: user,
        value: user.id,
        label: getFullName(user),
        disabled: data.users.some((u) => u.id === user.id),
        optionContent: (props: any) => <CustomOptionCmp {...props} />,
      })),
    [users, data],
  );

  const [selectedUserId, setSelectedUserId] = useState<string>(null);
  const [selectedPermission, setSelectedPermission] = useState<UserPermission | null>(
    UserPermission.VIEW,
  );

  const { onCreateDesignPermission, isLoading: isAddingPermission } = useCreateDesignPermission({
    onSuccess: (data, payload) => {},
    onError: () => {
      ToastService.error('Failed to add permission');
    },
  });

  const handleAddPermission = () => {
    onCreateDesignPermission({
      designId: data.id,
      userId: selectedUserId,
      canEdit: selectedPermission === UserPermission.EDIT,
      canView: true,
    });
  };

  return (
    <Stack p={12} gap={16}>
      <Flex gap={8} align="center">
        <ActionIcon onClick={onBack} variant="transparent" c="black">
          <IoArrowBack />
        </ActionIcon>
        <Text style={{ fontWeight: 500 }} size="sm">
          People with access
        </Text>
      </Flex>
      <Divider />

      <Grid>
        <Grid.Col span={8.5}>
          <ReactSelect
            isClearable
            options={userOptions}
            value={selectedUserId}
            isLoading={isFetchingUsers}
            filterOption={null}
            isOptionDisabled={(option) => option.disabled}
            onInputChange={(val) => {
              if (isValidEmail(val)) {
                setParams((prev) => ({ ...prev, emails: [val] }));
              }
            }}
            onChange={(name, value) => {
              setSelectedUserId(value);
            }}
            customOptionComponent={(props: SelectOptionsProps) => props.data.optionContent(props)}
            placeholder="Find users by email"
          />
        </Grid.Col>
        <Grid.Col span={3.5}>
          <Select
            withCheckIcon
            data={permissionOptions}
            value={selectedPermission}
            onChange={(value) => {
              setSelectedPermission(value as any);
            }}
          />
        </Grid.Col>
        {!isEmpty(selectedUserId) && (
          <Grid.Col span={12}>
            <Button
              fullWidth
              variant="gradient"
              loading={isAddingPermission}
              onClick={handleAddPermission}
            >
              Share
            </Button>
          </Grid.Col>
        )}
      </Grid>

      <Stack mah={200} style={{ overflowY: 'auto' }}>
        <Menu>
          {data.users.map((user) => (
            <AccessUserItem key={user.id} isOwner={user.id === data.createdByUserId} user={user} />
          ))}
        </Menu>
      </Stack>
    </Stack>
  );
};

type AccessUserItemProps = {
  isOwner?: boolean;
  user: IGetDesignUser;
};

const AccessUserItem = ({ user, isOwner = false }: AccessUserItemProps) => {
  const [selectedPermission, setSelectedPermission] = useState<UserPermission | null>(
    isOwner ? UserPermission.OWNER : user.canEdit ? UserPermission.EDIT : UserPermission.VIEW,
  );

  return (
    <Menu.Item
      leftSection={
        <Avatar src="image.png" size="sm" radius="xl">
          {getStandForName(user)}
        </Avatar>
      }
      rightSection={
        <Select
          size="xs"
          withCheckIcon
          style={{
            border: 'none',
            width: '90px !important',
          }}
          disabled={isOwner}
          value={selectedPermission}
          data={[
            ...permissionOptions,
            {
              value: UserPermission.OWNER,
              label: 'Owner',
              disabled: true,
            },
          ]}
          onChange={(value) => {
            setSelectedPermission(value as any);
          }}
        />
      }
    >
      <Stack gap={0} ml={4}>
        <Title order={6}>{getFullName(user)}</Title>
        <Text size="xs">{user.email}</Text>
      </Stack>
    </Menu.Item>
  );
};

export default PeopleAccess;
