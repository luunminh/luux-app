import { COLOR_CODE, Yup, isEmpty } from '@core/common';
import { Checkbox, Flex, SelectProps, Stack, Text } from '@mantine/core';
import { CgFileDocument } from 'react-icons/cg';
import { FaRegImage } from 'react-icons/fa';
import { MdOutlineVideoSettings } from 'react-icons/md';
import { TbPresentationAnalytics } from 'react-icons/tb';

export enum DownloadFileTypeEnum {
  PDF = 'PDF',
  JPG = 'JPG',
  PNG = 'PNG',
  PPTX = 'PPTX',

  GIF = 'GIF',
  SVG = 'SVG',
  VIDEO = 'VIDEO',
}

interface FileSelectOption {
  value: DownloadFileTypeEnum;
  label: string;
  icon: React.ReactNode;
  subLabel: string;
  disabled?: boolean;
}

export const mapFileIcons = {
  [DownloadFileTypeEnum.PDF]: <CgFileDocument size={16} />,
  [DownloadFileTypeEnum.JPG]: <FaRegImage size={16} />,
  [DownloadFileTypeEnum.PNG]: <FaRegImage size={16} />,
  [DownloadFileTypeEnum.PPTX]: <TbPresentationAnalytics size={16} />,

  [DownloadFileTypeEnum.GIF]: <FaRegImage size={16} />,
  [DownloadFileTypeEnum.SVG]: <FaRegImage size={16} />,
  [DownloadFileTypeEnum.VIDEO]: <MdOutlineVideoSettings size={16} />,
};

export const fileTypeOptions: FileSelectOption[] = [
  {
    label: 'PDF',
    value: DownloadFileTypeEnum.PDF,
    icon: mapFileIcons[DownloadFileTypeEnum.PDF],
    subLabel: 'Best for documents (and emailing)',
  },
  {
    label: 'JPG',
    value: DownloadFileTypeEnum.JPG,
    icon: mapFileIcons[DownloadFileTypeEnum.JPG],
    subLabel: 'Best for sharing',
  },
  {
    label: 'PNG',
    value: DownloadFileTypeEnum.PNG,
    icon: mapFileIcons[DownloadFileTypeEnum.PNG],
    subLabel: 'Best for complex images, illustrations, and logos',
  },
  {
    label: 'PPTX',
    value: DownloadFileTypeEnum.PPTX,
    icon: mapFileIcons[DownloadFileTypeEnum.PPTX],
    subLabel: 'Microsoft PowerPoint document',
    disabled: true,
  },

  {
    label: 'GIF',
    value: DownloadFileTypeEnum.GIF,
    icon: mapFileIcons[DownloadFileTypeEnum.GIF],
    subLabel: 'Short clip, no sound',
    disabled: true,
  },
  {
    label: 'SVG',
    value: DownloadFileTypeEnum.SVG,
    icon: mapFileIcons[DownloadFileTypeEnum.SVG],
    subLabel: 'Best for web design and animations',
    disabled: true,
  },
  {
    label: 'Video',
    value: DownloadFileTypeEnum.VIDEO,
    icon: mapFileIcons[DownloadFileTypeEnum.VIDEO],
    subLabel: 'High quality video',
    disabled: true,
  },
];

export const renderSelectFileTypeOption = ({
  option,
  checked,
}: {
  option: FileSelectOption;
  checked: boolean;
}) => (
  <Flex
    flex="1"
    gap="xs"
    style={{ borderRadius: 12 }}
    {...(checked && { c: COLOR_CODE.PRIMARY_500 })}
  >
    {option.icon}
    <Stack gap={4}>
      <Text size="sm" {...(checked && { style: { fontWeight: 600 } })}>
        {option.label}
      </Text>
      <Text size="xs" c={checked ? COLOR_CODE.PRIMARY_500 : 'gray'}>
        {option.subLabel}
      </Text>
    </Stack>
  </Flex>
);

export interface DownloadFileFormTypes {
  fileType: DownloadFileTypeEnum;
  pages: string[];
}

export enum DownloadFileFormKey {
  FILE_TYPE = 'fileType',
  PAGES = 'pages',
}

export const downloadFileFormSchema = Yup.object().shape({
  [DownloadFileFormKey.FILE_TYPE]: Yup.string().required(),
  [DownloadFileFormKey.PAGES]: Yup.array().required(),
});

export const initialValues: DownloadFileFormTypes = {
  fileType: DownloadFileTypeEnum.PDF,
  pages: [],
};

export const getArrayOfPages = (numberOfPages: number): string[] => {
  return Array.from({ length: numberOfPages }, (_, i) => `${i + 1}`);
};

export const mapPagesToSelectOptions = (pages: number[] | string[]) => {
  return isEmpty(pages) ? [] : pages.map((page) => ({ value: `${page}`, label: `Page ${page}` }));
};

export const renderSelectPageOption: SelectProps['renderOption'] = ({ option, checked }) => (
  <Flex flex="1" gap="xs" justify="space-between">
    {option.label}
    {checked && <Checkbox checked={checked} />}
  </Flex>
);
