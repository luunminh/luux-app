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
import { useDesignData } from '@modules/design/view/DesignForm/hooks';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import { useState } from 'react';
import { IoLockClosed } from 'react-icons/io5';
import { TfiWorld } from 'react-icons/tfi';
import { socketService } from 'src/service';

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

enum IDesignPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  CUSTOMIZE = 'CUSTOMIZE',
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

const mapLinkIcons = {
  [IDesignPrivacy.PRIVATE]: <IoLockClosed />,
  [IDesignPrivacy.PUBLIC]: <TfiWorld />,
};

const linkOptions = [
  {
    label: 'Only you can access',
    value: IDesignPrivacy.PRIVATE,
    subLabel: 'Only you can access the design using this link.',
    icon: <IoLockClosed size={20} />,
  },
  {
    label: 'Anyone with the link',
    value: IDesignPrivacy.PUBLIC,
    subLabel: 'Anyone with the link can access the design.',
    icon: <TfiWorld size={20} />,
  },
];

const LinkAccess = () => {
  const [access, setAccess] = useState(AccessTypeEnum.VIEW);
  const { data, onSetData } = useDesignStore();
  const { privacy } = data;

  const { isOwner } = useDesignData();

  const handleUpdatePrivacy = (value: IDesignPrivacy) => {
    onSetData({ ...data, privacy: value });
    socketService.editDesign({ ...data, privacy: value });
  };

  return (
    <InputWrapper label="Collaboration link">
      <Grid>
        <Grid.Col span={12}>
          <Select
            //@ts-ignore
            leftSection={mapLinkIcons[privacy]}
            data={linkOptions}
            value={privacy}
            disabled={!isOwner}
            //@ts-ignore
            renderOption={renderSelectOption}
            onChange={(value) => handleUpdatePrivacy(value as IDesignPrivacy)}
          />
        </Grid.Col>
        {privacy === IDesignPrivacy.PUBLIC && (
          <>
            {/* <Grid.Col span={4}>
              <Select
                data={accessOptions}
                value={access}
                onChange={(value) => setAccess(value as AccessTypeEnum)}
              />
            </Grid.Col> */}
            <Grid.Col span={12}>
              <CopyButton value={window.location.href}>
                {({ copied, copy }) => (
                  <Button size="sm" fullWidth color={copied ? 'teal' : 'blue'} onClick={copy}>
                    {copied ? 'Copied link' : 'Copy link'}
                  </Button>
                )}
              </CopyButton>
            </Grid.Col>
          </>
        )}
      </Grid>
    </InputWrapper>
  );
};

export default LinkAccess;
