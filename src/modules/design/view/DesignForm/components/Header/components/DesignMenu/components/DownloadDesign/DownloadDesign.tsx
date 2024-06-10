import { Callback } from '@core/common';
import { FormCore } from '@core/components';
import { useDownloadDesign, usePage } from '@design/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { ActionIcon, Button, Divider, Flex, MultiSelect, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { PageImage, useDesignContext, useDesignStore } from '@modules/design/view/DesignForm/store';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { IoArrowBack } from 'react-icons/io5';
import { PublicTemplate } from '../PublicTemplate';
import {
  DownloadFileFormKey,
  DownloadFileFormTypes,
  DownloadFileTypeEnum,
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
  const { onSetIsExporting, onSetSelectedPage, selectedPage } = useDesignStore();
  const { pageImagesStateChange, updatePageImages } = useDesignContext();
  const { exportImages, exportPdf } = useDownloadDesign();

  const defaultValues = useMemo<DownloadFileFormTypes>(() => {
    return {
      ...initialValues,
      pages: getArrayOfPages(numberOfPages),
    };
  }, [numberOfPages]);

  const { control, handleSubmit, watch, reset, setValue, getValues } =
    useForm<DownloadFileFormTypes>({
      defaultValues,
      mode: 'onChange',
      reValidateMode: 'onChange',
      shouldFocusError: true,
      resolver: yupResolver<any>(downloadFileFormSchema),
    });

  const fileTypeVal = watch(DownloadFileFormKey.FILE_TYPE);

  const onValidSubmit = (formValues: DownloadFileFormTypes) => {
    handleExportDesign(formValues, handleExportFiles);
  };

  const handleExportFiles = (pages: PageImage[]) => {
    switch (fileTypeVal) {
      case DownloadFileTypeEnum.JPG:
      case DownloadFileTypeEnum.PNG:
        exportImages(pages);
        break;
      case DownloadFileTypeEnum.PDF:
        // TODO: support export more types
        exportPdf(
          pages,
          getValues(DownloadFileFormKey.FILE_TYPE) === DownloadFileTypeEnum.PDF ? 'doc' : 'slide',
        );
        break;
    }
  };

  const handleOpenPublicTemplateModals = (pageImages: PageImage[]) => {
    modals.open({
      title: <Title order={4}>Create Template</Title>,
      size: 'xl',
      withCloseButton: true,
      children: <PublicTemplate pageImages={pageImages} />,
      overlayProps: { backgroundOpacity: 0.5, blur: 4 },
    });
  };

  const handleExportDesign = (formValues: DownloadFileFormTypes, callBack: Callback) => {
    const pages = formValues.pages.map((page) => Number(page));
    onSetIsExporting(true);
    const currentPage = selectedPage;

    const subscription = pageImagesStateChange.subscribe((pageImages) => {
      if (pageImages.length === formValues.pages.length) {
        updatePageImages([]);
        onSetIsExporting(false);
        onSetSelectedPage(currentPage);

        callBack(pageImages);

        subscription.unsubscribe();
      } else {
        const nextSelectedPage = pages.find(
          (page) => !pageImages.some((pageImage) => pageImage.pageNumber === page),
        );

        // Delay to prevent flickering
        setTimeout(() => {
          onSetSelectedPage(nextSelectedPage);
        }, 100);
      }
    });
  };

  const handlePublicTemplate = (formValues: DownloadFileFormTypes) => {
    handleExportDesign(formValues, handleOpenPublicTemplateModals);
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
        <Text style={{ fontWeight: 500 }} size="sm">
          Download
        </Text>
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

      <Divider />
      <Button onClick={handleSubmit(handlePublicTemplate)} variant="gradient" mt={16} fullWidth>
        Public as a template
      </Button>
    </Stack>
  );
};

export default DownloadDesign;
