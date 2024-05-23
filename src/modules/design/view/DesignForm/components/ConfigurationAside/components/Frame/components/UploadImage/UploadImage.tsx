import { COLOR_CODE, ToastService, isEmpty } from '@core/common';
import { UploadFileTypeEnum, useUploadAttachment } from '@core/queries';
import { IShape } from '@design/types';
import { Flex, InputWrapper, Stack, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useShape } from '@modules/design/view/DesignForm/hooks';
import { useEffect, useState } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { ImagePreview } from './components';

type Props = { selectedShape: IShape };
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UploadImage = ({ selectedShape }: Props) => {
  const { updateShape } = useShape();

  const [imageUrls, setImageUrls] = useState<string[]>([selectedShape.attrs.src]);

  useEffect(() => {
    const isExist = imageUrls.some((url) => url === selectedShape.attrs.src);
    if (!isExist) setImageUrls((prev) => [...prev, selectedShape.attrs.src]);
  }, [selectedShape.attrs.src, imageUrls]);

  const { onUploadAttachment, isLoading } = useUploadAttachment({
    onSuccess({ data }) {
      setImageUrls((prev) => [...prev, data.url]);
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

  const isSelectedUrl = (src: string) => selectedShape.attrs.src === src;

  const handleRemoveUrl = (src: string) => {
    setImageUrls((prev) => prev.filter((url) => url !== src));

    if (isSelectedUrl(src)) {
      updateShape(selectedShape.id, {
        ...selectedShape,
        attrs: {
          ...selectedShape.attrs,
          src: null,
        },
      } as IShape);
    }
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
        {!isEmpty(imageUrls) && (
          <Flex wrap="wrap" gap={24} justify="center">
            {imageUrls.map((url) => (
              <ImagePreview
                isSelected={isSelectedUrl(url)}
                onUpdateShapeUrl={() => handleUpdateShapeUrl(url)}
                onRemoveUrl={() => handleRemoveUrl(url)}
                key={url}
                url={url}
              />
            ))}
          </Flex>
        )}
      </Stack>
    </InputWrapper>
  );
};

export default UploadImage;
