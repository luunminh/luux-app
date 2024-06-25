import { COLOR_CODE, ToastService, getRandomId, isEmpty } from '@core/common';
import {
  IAttachment,
  UploadFileTypeEnum,
  useGetAttachmentsLazy,
  useUploadAttachment,
} from '@core/queries';
import { useShape } from '@design/hooks';
import { useDesignStore } from '@design/store';
import { IShape, ShapeTypeEnum } from '@design/types';
import {
  ActionIcon,
  Button,
  FileButton,
  Grid,
  Loader,
  Menu,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { IoIosMore } from 'react-icons/io';

const UploadSection = () => {
  // TODO: search by api
  const [search, setSearch] = useState('');

  const { addShape, updateShape } = useShape();
  const { selectedItems } = useDesignStore();
  const isSelectedFrame =
    selectedItems.some((item) => item.attrs.shapeType === ShapeTypeEnum.IMAGE_FRAME) &&
    selectedItems.length === 1;

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

  const handleAddImageToFrame = (url: string) => {
    const currentFrame = selectedItems.find(
      (item) => item.attrs.shapeType === ShapeTypeEnum.IMAGE_FRAME,
    );

    if (currentFrame) {
      updateShape(currentFrame.id, {
        id: currentFrame.id,
        attrs: {
          ...currentFrame.attrs,
          src: url,
        },
      } as IShape);
    }
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
        span={6}
        key={img.asset_id}
        className="flex justify-center"
        style={{
          position: 'relative',
          cursor: 'pointer',
          border: COLOR_CODE.BORDER_DEFAULT,
          borderRadius: 12,
        }}
      >
        <img
          loading="lazy"
          className="object-contain h-32"
          src={img.secure_url}
          alt={img.public_id}
        />

        <Menu width={200} position="bottom" shadow="md">
          <Menu.Target>
            <ActionIcon
              variant="outline"
              color="gray"
              size="xs"
              style={{ position: 'absolute', top: '12px', right: '12px' }}
            >
              <IoIosMore />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => handleAddImage(img)}>Add</Menu.Item>
            <Menu.Item
              disabled={!isSelectedFrame}
              onClick={() => handleAddImageToFrame(img.secure_url)}
            >
              Add to frame
            </Menu.Item>
            {/* TODO: implement delete*/}
            <Menu.Item disabled>Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Grid.Col>
    ));
  };

  return (
    <Stack gap={16} p={16} w="100%" mah="90vh" style={{ overflowY: 'auto' }}>
      <Grid style={{ width: '100%' }} gutter={8}>
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
