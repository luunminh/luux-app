import Konva from 'konva';
import { create } from 'zustand';
import { IShape, ShapeTypeEnum } from '../types';

type DesignStore = {
  selectedShapes: IShape[];
  onSetSelectedShapes: (shapes: IShape[]) => void;

  shapes: IShape[];
  onSetShapes: (objects: IShape[]) => void;

  isDragging: boolean;
  onSetIsDragging: (isDragging: boolean) => void;

  isDrawing: boolean;
  onSetIsDrawing: (isDrawing: boolean) => void;
};

// TODO: get initData and canvasObject from liveblock and API
const initialData: IShape[] = [
  {
    id: '1',
    attrs: {
      name: 'Rectangle 1',
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: 'red',
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
    },
  },
  {
    id: '3',
    attrs: {
      shapeType: ShapeTypeEnum.TEXT,
      fontSize: 30,
      name: 'Text 1',
      x: 100,
      y: 400,
      text: 'nihao lai la toi day',
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
      stroke: 'black',
      strokeWidth: 4,
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
      sceneFunc: (context: Konva.Context, shape: Konva.Shape) => {
        const sides = shape.attrs.sides;
        const radius = shape.attrs.radius;

        context.beginPath();
        context.moveTo(radius, 0);

        for (let i = 1; i < sides; i++) {
          const x = radius * Math.cos((i * 2 * Math.PI) / sides);
          const y = radius * Math.sin((i * 2 * Math.PI) / sides);
          context.lineTo(x, y);
        }

        context.closePath();
        context.fillStrokeShape(shape);
      },
    },
  },
];

export const useDesignStore = create<DesignStore>((set) => ({
  selectedShapes: [],
  onSetSelectedShapes: (shapes: IShape[]) => set({ selectedShapes: shapes }),

  shapes: [...initialData],
  onSetShapes: (newShapes: IShape[]) => set({ shapes: newShapes }),

  isDragging: false,
  onSetIsDragging: (isDragging: boolean) => set({ isDragging }),

  isDrawing: false,
  onSetIsDrawing: (isDrawing: boolean) => set({ isDrawing }),
}));
