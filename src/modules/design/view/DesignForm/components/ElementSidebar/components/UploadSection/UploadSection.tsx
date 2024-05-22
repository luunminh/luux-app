import { ToastService, getRandomId, isEmpty } from '@core/common';
import {
  IAttachment,
  UploadFileTypeEnum,
  useGetAttachmentsLazy,
  useUploadAttachment,
} from '@core/queries';
import { useShape } from '@design/hooks';
import { IShape, ShapeTypeEnum } from '@design/types';
import {
  ActionIcon,
  Button,
  FileButton,
  Grid,
  Image,
  Loader,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const UploadSection = () => {
  // TODO: search by api
  const [search, setSearch] = useState('');

  const { addShape } = useShape();

  const {
    attachments,
    isFetching,
    inputSearch,
    setInputSearch,
    hasNext,
    fetchNextPage,
    handleInvalidateAttachments,
  } = useGetAttachmentsLazy();

  const { onUploadAttachment, isLoading: isUploadingFile } = useUploadAttachment({
    onSuccess: () => {
      handleInvalidateAttachments();
    },
    onError: () => {
      ToastService.error('Failed to upload attachment');
    },
  });

  const filterAttachments = attachments.filter((attachment) => {
    return attachment.public_id.toLowerCase().includes(search.toLowerCase());
  });

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // setInputSearch(val);

    setSearch(val);
  };

  const handleUploadFile = (img: File) => {
    const file = new File([img], img.name, { type: img.type });

    onUploadAttachment({ file: file, type: UploadFileTypeEnum.ATTACHMENTS });
  };

  const handleAddImage = (img: IAttachment) => {
    const newShape = {
      id: getRandomId(),
      attrs: {
        shapeType: ShapeTypeEnum.IMAGE,
        x: 100,
        y: 100,
        src: img.secure_url,
        width: img.width,
        height: img.height,
      },
    } as IShape;

    addShape(newShape);
  };

  const renderContent = () => {
    if (isFetching) {
      return (
        <Stack p={16} justify="center" align="center" w="100%">
          <Loader />
        </Stack>
      );
    }

    if (isEmpty(filterAttachments)) {
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

    return filterAttachments.map((img) => (
      <Grid.Col
        span={4}
        key={img.asset_id}
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={() => {
          handleAddImage(img);
        }}
      >
        <Image radius="md" loading="lazy" src={img.secure_url} alt={img.public_id} h={90} />
        <Tooltip label="Delete" withArrow>
          <ActionIcon
            variant="outline"
            c="gray"
            size="xs"
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            <IoClose />
          </ActionIcon>
        </Tooltip>
      </Grid.Col>
    ));
  };

  return (
    <Stack gap={16} p={16} w="100%">
      <Grid style={{ width: '100%' }}>
        <Grid.Col span={12}>
          <TextInput
            value={search}
            placeholder="Search by image name"
            onChange={handleChangeSearch}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <FileButton accept="image/png,image/jpeg" onChange={handleUploadFile}>
            {(props) => (
              <Button loading={isUploadingFile} fullWidth variant="gradient" {...props}>
                Upload image
              </Button>
            )}
          </FileButton>
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

export default UploadSection;
