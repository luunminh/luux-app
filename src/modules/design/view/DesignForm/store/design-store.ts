import { create } from 'zustand';
import { IDesignContent, ShapeTypeEnum } from '../types';

type DesignStore = {
  selectedPage: number;
  onSetSelectedPage: (page: number) => void;

  data: IDesignContent[];
  onSetData: (newData: IDesignContent[]) => void;

  isDragging: boolean;
  onSetIsDragging: (isDragging: boolean) => void;

  isDrawing: boolean;
  onSetIsDrawing: (isDrawing: boolean) => void;

  isSelectedItems: boolean;
  onSetSelectedItems: (isSelectedItems: boolean) => void;
};

// TODO: get initData and canvasObject from liveblock and API
const initialData: IDesignContent[] = [
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
          layerIdx: 1,
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
          layerIdx: 2,
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
          layerIdx: 3,
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
          src: 'https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/800px-Man_Utd_FC_.svg.png',
          layerIdx: 4,
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
          layerIdx: 0,
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
          layerIdx: 0,
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
          shapeType: ShapeTypeEnum.CUSTOM,
          name: 'Custom 1',
          sides: 5,
          radius: 70,
          src: 'https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/800px-Man_Utd_FC_.svg.png',
          stroke: 'black',
          strokeWidth: 4,
          draggable: true,
          fillPatternScale: { x: 0.1, y: 0.1 },
          layerIdx: 0,
        },
      },
    ],
  },
];

export const useDesignStore = create<DesignStore>((set) => ({
  selectedPage: 1,
  onSetSelectedPage: (page: number) => set({ selectedPage: page }),

  data: [...initialData],
  onSetData: (newData: IDesignContent[]) => set({ data: newData }),

  isDragging: false,
  onSetIsDragging: (isDragging: boolean) => set({ isDragging }),

  isDrawing: false,
  onSetIsDrawing: (isDrawing: boolean) => set({ isDrawing }),

  isSelectedItems: false,
  onSetSelectedItems: (isSelectedItems: boolean) => set({ isSelectedItems }),
}));
