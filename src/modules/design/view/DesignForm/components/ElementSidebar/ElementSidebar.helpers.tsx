import { getTitleCase } from '@core/common';
import { FaShapes } from 'react-icons/fa';
import { IoCloudUploadSharp } from 'react-icons/io5';
import { LuFrame } from 'react-icons/lu';
import { MdDraw, MdOutlineDashboardCustomize } from 'react-icons/md';
import { RiLayout2Fill } from 'react-icons/ri';
import { TbTextSize } from 'react-icons/tb';

export enum ElementSidebarTabEnum {
  TEMPLATE = 'template',
  ELEMENTS = 'elements',
  SHAPES = 'shapes',
  TEXT = 'text',
  UPLOAD = 'upload',
  DRAW = 'draw',
  FRAME = 'frame',
}

export const sidebarTabOptions = [
  {
    value: ElementSidebarTabEnum.TEMPLATE,
    label: getTitleCase(ElementSidebarTabEnum.TEMPLATE),
    icon: <RiLayout2Fill size={22} />,
  },
  {
    value: ElementSidebarTabEnum.ELEMENTS,
    label: getTitleCase(ElementSidebarTabEnum.ELEMENTS),
    icon: <MdOutlineDashboardCustomize size={22} />,
  },
  {
    value: ElementSidebarTabEnum.SHAPES,
    label: getTitleCase(ElementSidebarTabEnum.SHAPES),
    icon: <FaShapes size={22} />,
  },
  {
    value: ElementSidebarTabEnum.TEXT,
    label: getTitleCase(ElementSidebarTabEnum.TEXT),
    icon: <TbTextSize size={22} />,
  },
  {
    value: ElementSidebarTabEnum.UPLOAD,
    label: getTitleCase(ElementSidebarTabEnum.UPLOAD),
    icon: <IoCloudUploadSharp size={22} />,
  },
  {
    value: ElementSidebarTabEnum.DRAW,
    label: getTitleCase(ElementSidebarTabEnum.DRAW),
    icon: <MdDraw size={22} />,
  },
  {
    value: ElementSidebarTabEnum.FRAME,
    label: getTitleCase(ElementSidebarTabEnum.FRAME),
    icon: <LuFrame size={22} />,
  },
];
