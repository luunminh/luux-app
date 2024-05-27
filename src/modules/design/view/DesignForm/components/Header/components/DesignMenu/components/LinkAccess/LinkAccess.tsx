import { COLOR_CODE } from '@core/common';
import {
  Button,
  CopyButton,
  Flex,
  Grid,
  InputWrapper,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { IoLockClosed } from 'react-icons/io5';
import { TfiWorld } from 'react-icons/tfi';

interface ExtendedSelectOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  subLabel: string;
}

const renderSelectOption = ({
  option,
  checked,
}: {
  option: ExtendedSelectOption;
  checked: boolean;
}) => (
  <Flex flex="1" gap="xs">
    {option.icon}
    <Stack gap={4}>
      <Title size={12} order={5}>
        {option.label}
      </Title>
      <Text size="xs" c={COLOR_CODE.GRAY_600}>
        {option.subLabel}
      </Text>
    </Stack>
  </Flex>
);

enum AccessTypeEnum {
  VIEW = 'view',
  EDIT = 'edit',
  COMMENT = 'comment',
}

const accessOptions = [
  {
    label: 'Can view',
    value: AccessTypeEnum.VIEW,
  },
  {
    label: 'Can edit',
    value: AccessTypeEnum.EDIT,
  },
  {
    label: 'Can comment',
    value: AccessTypeEnum.COMMENT,
  },
];

enum LinkAccessTypeEnum {
  ONLY_YOU = 'only-you',
  ANYONE_WITH_LINK = 'anyone-with-link',
}

const mapLinkIcons = {
  [LinkAccessTypeEnum.ONLY_YOU]: <IoLockClosed />,
  [LinkAccessTypeEnum.ANYONE_WITH_LINK]: <TfiWorld />,
};

const linkOptions = [
  {
    label: 'Only you can access',
    value: LinkAccessTypeEnum.ONLY_YOU,
    subLabel: 'Only you can access the design using this link.',
    icon: <IoLockClosed size={20} />,
  },
  {
    label: 'Anyone with the link',
    value: LinkAccessTypeEnum.ANYONE_WITH_LINK,
    subLabel: 'Anyone with the link can access the design.',
    icon: <TfiWorld size={20} />,
  },
];

const LinkAccess = () => {
  const [access, setAccess] = useState(AccessTypeEnum.VIEW);
  const [linkAccess, setLinkAccess] = useState(LinkAccessTypeEnum.ONLY_YOU);

  return (
    <InputWrapper label="Collaboration link">
      <Grid>
        <Grid.Col span={linkAccess === LinkAccessTypeEnum.ONLY_YOU ? 12 : 8}>
          <Select
            leftSection={mapLinkIcons[linkAccess]}
            data={linkOptions}
            value={linkAccess}
            //@ts-ignore
            renderOption={renderSelectOption}
            onChange={(value) => setLinkAccess(value as LinkAccessTypeEnum)}
          />
        </Grid.Col>
        {linkAccess === LinkAccessTypeEnum.ANYONE_WITH_LINK && (
          <Grid.Col span={4}>
            <Select
              data={accessOptions}
              value={access}
              onChange={(value) => setAccess(value as AccessTypeEnum)}
            />
          </Grid.Col>
        )}
        <Grid.Col span={12}>
          <CopyButton value="https://mantine.dev">
            {({ copied, copy }) => (
              <Button size="sm" fullWidth color={copied ? 'teal' : 'blue'} onClick={copy}>
                {copied ? 'Copied link' : 'Copy link'}
              </Button>
            )}
          </CopyButton>
        </Grid.Col>
      </Grid>
    </InputWrapper>
  );
};

export default LinkAccess;
