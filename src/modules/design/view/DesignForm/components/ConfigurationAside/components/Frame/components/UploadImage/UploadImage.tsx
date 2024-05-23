import { COLOR_CODE, ToastService, isEmpty } from '@core/common';
import { UploadFileTypeEnum, useUploadAttachment } from '@core/queries';
import { IShape } from '@design/types';
import { Flex, InputWrapper, Stack, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useShape } from '@modules/design/view/DesignForm/hooks';
import { useState } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { ImagePreview } from './components';

type Props = { selectedShape: IShape };
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UploadImage = ({ selectedShape }: Props) => {
  const { updateShape } = useShape();

  const [imageUrl, setImageUrl] = useState<string>(selectedShape.attrs.src);

  const { onUploadAttachment, isLoading } = useUploadAttachment({
    onSuccess({ data }) {
      setImageUrl(data.url);
    },
    onError(error) {
      ToastService.error(error.message);
    },
  });

  const handleUploadFile = (files: FileWithPath[]) => {
    const fileWithPath = files[0];
    const file = new File([fileWithPath], fileWithPath.name, { type: fileWithPath.type });

    onUploadAttachment({ file: file, type: UploadFileTypeEnum.THUMBNAIL });
  };

  const handleUpdateShapeUrl = (src: string) => {
    updateShape(selectedShape.id, {
      ...selectedShape,
      attrs: {
        ...selectedShape.attrs,
        src,
      },
    } as IShape);
  };

  const handleRemoveUrl = () => {
    setImageUrl(null);
    updateShape(selectedShape.id, {
      ...selectedShape,
      attrs: {
        ...selectedShape.attrs,
        src: null,
      },
    } as IShape);
  };

  return (
    <InputWrapper label="Upload image">
      <Stack gap={16} p={16} style={{ border: COLOR_CODE.BORDER_DEFAULT, borderRadius: 12 }}>
        <Dropzone
          onDrop={handleUploadFile}
          maxFiles={1}
          maxSize={MAX_FILE_SIZE}
          accept={IMAGE_MIME_TYPE}
          loading={isLoading}
        >
          <Flex gap={8} align="center" justify="center" p={16}>
            <Dropzone.Idle>
              <HiOutlinePhotograph size={50} />
            </Dropzone.Idle>
            <Text size="xl" inline>
              Drag image here or click to select file
            </Text>
          </Flex>
        </Dropzone>
        {!isEmpty(imageUrl) && (
          <Flex wrap="wrap" gap={24} justify="center">
            <ImagePreview
              onUpdateShapeUrl={handleUpdateShapeUrl}
              onRemoveUrl={handleRemoveUrl}
              key={imageUrl}
              url={imageUrl}
            />
          </Flex>
        )}
      </Stack>
    </InputWrapper>
  );
};

export default UploadImage;
