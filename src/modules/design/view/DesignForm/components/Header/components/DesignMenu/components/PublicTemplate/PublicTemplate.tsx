/* eslint-disable jsx-a11y/alt-text */
import { ToastService, isEmpty, useComponentDidMount } from '@core/common';
import { UploadFileTypeEnum, useGetScreenSizeList, useUploadAttachment } from '@core/queries';
import { PageImage, useDesignStore } from '@design/store';
import { Carousel } from '@mantine/carousel';
import { Button, Flex, Grid, InputWrapper, Loader, Stack, TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useCreateTemplate, useGetTemplatesLazy } from '@modules/design/queries';
import { useState } from 'react';

type Props = {
  pageImages: PageImage[];
};

const PublicTemplate = ({ pageImages }: Props) => {
  const { data } = useDesignStore();
  const [name, setName] = useState('');

  const {
    screenSizeList,
    isFetching: isFetchingScreenSize,
    setParams,
  } = useGetScreenSizeList({
    enabled: !isEmpty(data.screenSizeId),
  });

  const { handleInvalidateTemplates } = useGetTemplatesLazy();

  const { onUploadAttachment, isLoading: isUploadingAttachment } = useUploadAttachment({
    onSuccess({ data }) {
      handleCreateTemplate(data.secure_url);
    },
    onError(error) {
      ToastService.error(error.message);
    },
  });
  const { onCreateTemplate, isLoading: isCreatingTemplate } = useCreateTemplate({
    onSuccess: () => {
      ToastService.success('Template created successfully');
      handleInvalidateTemplates();
      modals.closeAll();
    },
    onError: () => {
      ToastService.error('Failed to create template');
    },
  });

  const screenSize = screenSizeList[0];

  useComponentDidMount(() => {
    setParams((prev) => ({ ...prev, screenSizeIds: [data.screenSizeId] }));
  });

  const handleCloseModal = () => modals.closeAll();

  const handleCreateTemplate = (imgUrl: string) => {
    onCreateTemplate({
      name,
      screenSizeId: data.screenSizeId,
      jsonState: data.metadata,
      thumbnailUrl: imgUrl,
    });
  };

  const handleUploadThumbnail = () => {
    onUploadAttachment({ file: pageImages[0].image, type: UploadFileTypeEnum.THUMBNAIL });
  };

  if (isFetchingScreenSize) {
    return (
      <Stack p={16} justify="center" align="center" w="100%">
        <Loader />
      </Stack>
    );
  }

  const isLoading = isCreatingTemplate || isUploadingAttachment;

  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <TextInput value={name} label="Template Name" onChange={(e) => setName(e.target.value)} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput readOnly value={screenSize?.name} label="Type" />
        </Grid.Col>
        <Grid.Col>
          <InputWrapper label="Preview">
            <Carousel withIndicators>
              {pageImages.map((page) => (
                <Carousel.Slide key={page.pageNumber}>
                  <img
                    loading="lazy"
                    alt={`preview-page ${page.pageNumber}`}
                    className="w-auto max-h-64 h-full object-contain"
                    src={URL.createObjectURL(page.image)}
                    style={{ borderRadius: 20, width: '-webkit-fill-available' }}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </InputWrapper>
        </Grid.Col>
      </Grid>
      <Flex justify="end" gap={16} mt={16}>
        <Button variant="outline" disabled={isLoading} onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          loading={isLoading}
          onClick={handleUploadThumbnail}
          disabled={isEmpty(name)}
          variant="gradient"
        >
          Create
        </Button>
      </Flex>
    </>
  );
};

export default PublicTemplate;
