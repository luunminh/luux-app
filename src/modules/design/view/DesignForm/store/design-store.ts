import { IGetDesign } from '@modules/design/queries';
import { create } from 'zustand';
import { IDesignContent, IShape, ShapeTypeEnum } from '../types';

type DesignStore = {
  selectedPage: number;
  onSetSelectedPage: (page: number) => void;

  data: IGetDesign;
  onSetData: (newData: IGetDesign) => void;

  isExporting: boolean;
  onSetIsExporting: (isExporting: boolean) => void;

  isDragging: boolean;
  onSetIsDragging: (isDragging: boolean) => void;

  isDrawing: boolean;
  onSetIsDrawing: (isDrawing: boolean) => void;

  selectedItems: IShape[];
  onSetSelectedItems: (newItems: IShape[]) => void;
};

// TODO: get initData and canvasObject from liveblock and API
export const initialData: IDesignContent[] = [
  {
    pageNumber: 1,
    shapes: [
      {
        id: '1',
        attrs: {
          name: 'Rectangle 1',
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          fill: '#e30606',
          scale: { x: 1, y: 1 },
          draggable: true,
          shapeType: ShapeTypeEnum.RECTANGLE,
        },
      },
      {
        id: '2',
        attrs: {
          name: 'Circle 1',
          x: 200,
          y: 200,
          width: 100,
          height: 100,
          fill: 'blue',
          scale: { x: 1, y: 1 },
          draggable: true,
          shapeType: ShapeTypeEnum.CIRCLE,
          group: 'group1',
        },
      },
      {
        id: '3',
        attrs: {
          shapeType: ShapeTypeEnum.TEXT,
          fontSize: 30,
          name: 'Text 1',
          height: 50,
          width: 200,
          x: 100,
          y: 400,
          text: 'Hello World',
        },
      },
      {
        id: '4',
        attrs: {
          shapeType: ShapeTypeEnum.IMAGE,
          name: 'Image 1',
          image: undefined,
          width: 300,
          height: 300,
          x: 400,
          y: 200,
          src: 'http://res.cloudinary.com/dqjshrusa/image/upload/v1716974084/luux/thumbnails/c8edh4bqzju9g8h0fpws.png',
        },
      },
      {
        id: '5',
        attrs: {
          shapeType: ShapeTypeEnum.LINE,
          name: 'Line 1',
          points: [0, 0, 100, 100],
          stroke: 'black',
          strokeWidth: 5,
          group: 'group1',
        },
      },
      {
        id: '6',
        attrs: {
          width: 100,
          height: 100,
          x: 265,
          y: 265,
          shapeType: ShapeTypeEnum.ARROW,
          name: 'Custom 1',
          points: [0, 0, 100, 100],
          stroke: 'red',
          strokeWidth: 4,
          dash: [10, 20, 50],
        },
      },
      {
        id: '7',
        attrs: {
          width: 100,
          height: 100,
          x: 300,
          y: 100,
          shapeType: ShapeTypeEnum.IMAGE_FRAME,
          name: 'Custom 1',
          sides: 5,
          radius: 70,
          src: 'http://res.cloudinary.com/dqjshrusa/image/upload/v1716974084/luux/thumbnails/c8edh4bqzju9g8h0fpws.png',
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
          baseNode: ShapeTypeEnum.RECTANGLE,
          fillPatternRepeat: 'no-repeat',
        },
      },
      {
        id: 'Custom SVG',
        attrs: {
          width: 100,
          height: 100,
          x: 400,
          y: 100,
          shapeType: ShapeTypeEnum.CUSTOM,
          name: 'Custom',
          src: 'http://res.cloudinary.com/dqjshrusa/image/upload/v1716974084/luux/thumbnails/c8edh4bqzju9g8h0fpws.png',
          colors: ['#000', '#ddd', '#ddd', '#ddd', '#ddd'],
        },
      },
    ],
  },
  {
    pageNumber: 2,
    shapes: [
      {
        id: '12313123123',
        attrs: {
          shapeType: ShapeTypeEnum.IMAGE,
          name: 'Image 1',
          image: undefined,
          width: 300,
          height: 300,
          x: 400,
          y: 200,
          src: 'http://res.cloudinary.com/dqjshrusa/image/upload/v1716974084/luux/thumbnails/c8edh4bqzju9g8h0fpws.png',
        },
      },
    ],
  },
];

export const useDesignStore = create<DesignStore>((set) => ({
  selectedPage: 1,
  onSetSelectedPage: (page: number) => set({ selectedPage: page }),

  data: null,
  onSetData: (newData: IGetDesign) => set({ data: newData }),

  isExporting: false,
  onSetIsExporting: (isExporting: boolean) => set({ isExporting }),

  isDragging: false,
  onSetIsDragging: (isDragging: boolean) => set({ isDragging }),

  isDrawing: false,
  onSetIsDrawing: (isDrawing: boolean) => set({ isDrawing }),

  selectedItems: [],
  onSetSelectedItems: (newItems: IShape[]) => set({ selectedItems: newItems }),
}));
