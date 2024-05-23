import { ActionIcon, Image, Stack, Tooltip } from '@mantine/core';
import { IoClose } from 'react-icons/io5';

type Props = {
  url: string;
  onUpdateShapeUrl: (src: string) => void;
  onRemoveUrl: () => void;
};

const ImagePreview = ({ url, onUpdateShapeUrl, onRemoveUrl }: Props) => {
  return (
    <Stack
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => {
        onUpdateShapeUrl(url);
      }}
    >
      <Image radius="md" loading="lazy" src={url} alt="Image" h={120} w={120} />
      <Tooltip label="This action also remove current url from your current frame" withArrow>
        <ActionIcon
          variant="outline"
          c="gray"
          size="xs"
          onClick={() => onRemoveUrl()}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          <IoClose />
        </ActionIcon>
      </Tooltip>
    </Stack>
  );
};

export default ImagePreview;
