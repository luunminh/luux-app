import { FormCore } from '@core/components';
import { usePage } from '@design/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActionIcon, Button, Divider, Flex, MultiSelect, Stack, Text } from '@mantine/core';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { IoArrowBack } from 'react-icons/io5';
import {
  DownloadFileFormKey,
  DownloadFileFormTypes,
  downloadFileFormSchema,
  fileTypeOptions,
  getArrayOfPages,
  initialValues,
  mapFileIcons,
  mapPagesToSelectOptions,
  renderSelectFileTypeOption,
  renderSelectPageOption,
} from './DownloadDesign.helpers';

type Props = {
  onBack: () => void;
};

const DownloadDesign = ({ onBack }: Props) => {
  const { numberOfPages } = usePage();
  const { onSetPageQueue, onSetSelectedPage, pageImages } = useDesignStore();
  console.log('DownloadDesign ~ pageImages:', pageImages);

  useEffect(() => {
    console.log('pageImages changes', pageImages)
  }, [pageImages]);

  const defaultValues = useMemo<DownloadFileFormTypes>(() => {
    return {
      ...initialValues,
      pages: getArrayOfPages(numberOfPages),
    };
  }, [numberOfPages]);

  const { control, handleSubmit, watch, reset, setValue } = useForm<DownloadFileFormTypes>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver<any>(downloadFileFormSchema),
  });

  const fileTypeVal = watch(DownloadFileFormKey.FILE_TYPE);

  const onValidSubmit = (formValues: DownloadFileFormTypes) => {
    console.log(formValues);
    onSetPageQueue(formValues.pages.length);

    formValues.pages.forEach((page, idx) => {
      setTimeout(() => {
        onSetSelectedPage(Number(page));
      }, 1000);
    });
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Stack p={12} gap={16}>
      <Flex gap={8} align="center">
        <ActionIcon onClick={onBack} variant="transparent" c="black">
          <IoArrowBack />
        </ActionIcon>
        <Text size="sm">Download</Text>
      </Flex>
      <Divider />

      <FormCore.Select
        label="File type"
        control={control}
        data={fileTypeOptions}
        name={DownloadFileFormKey.FILE_TYPE}
        //@ts-ignore
        renderOption={renderSelectFileTypeOption}
        leftSection={mapFileIcons[fileTypeVal]}
      />

      <MultiSelect
        label="Select pages"
        value={watch(DownloadFileFormKey.PAGES)}
        renderOption={renderSelectPageOption}
        onChange={(value) => {
          setValue(DownloadFileFormKey.PAGES, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
          });
        }}
        data={mapPagesToSelectOptions(defaultValues.pages)}
      />

      <Button onClick={handleSubmit(onValidSubmit)} fullWidth>
        Download
      </Button>
    </Stack>
  );
};

export default DownloadDesign;
