import { COLOR_CODE } from '@core/common';
import { ActionIcon, Image, Stack, Tooltip } from '@mantine/core';
import { IoClose } from 'react-icons/io5';

type Props = {
  isSelected: boolean;
  url: string;
  onUpdateShapeUrl: (src: string) => void;
  onRemoveUrl: (src: string) => void;
};

const ImagePreview = ({ url, onUpdateShapeUrl, onRemoveUrl, isSelected }: Props) => {
  return (
    <Stack
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => {
        onUpdateShapeUrl(url);
      }}
    >
      <Image
        radius="md"
        loading="lazy"
        src={url}
        alt="Image"
        h={80}
        w={80}
        style={{
          border: isSelected ? `2px solid ${COLOR_CODE.ACTIVE}` : '',
        }}
      />
      <Tooltip
        label={isSelected ? 'This action also remove current url from your current frame' : ''}
        withArrow
      >
        <ActionIcon
          variant="outline"
          color="gray"
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveUrl(url);
          }}
          style={{ position: 'absolute', top: '12px', right: '12px' }}
        >
          <IoClose />
        </ActionIcon>
      </Tooltip>
    </Stack>
  );
};

export default ImagePreview;
