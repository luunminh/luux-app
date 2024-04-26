import { useDesignStore } from '../store';
import { IShape } from '../types';

const useShape = () => {
  const { shapes, onSetShapes } = useDesignStore();

  const addShape = (newShape: IShape) => {
    onSetShapes([...shapes, newShape]);
  };

  const addShapes = (newShapes: IShape[]) => {
    onSetShapes([...shapes, ...newShapes]);
  };

  const updateShape = (shapeId: string, newShape: IShape) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return { ...shape, ...newShape };
      }
      return shape;
    });

    onSetShapes(updatedShapes);
  };

  const updateShapes = (shapeId: string[], newShapes: IShape[]) => {
    const updatedShapes = shapes.map((shape) => {
      if (shapeId.includes(shape.id)) {
        return newShapes.find((newShape) => newShape.id === shape.id);
      }
      return shape;
    });

    onSetShapes(updatedShapes);
  };

  const removeShape = (shapeId: string) => {
    onSetShapes(shapes.filter((shape) => shape.id !== shapeId));
  };

  const removeShapes = (shapeIds: string[]) => {
    onSetShapes(shapes.filter((shape) => !shapeIds.includes(shape.id)));
  };

  const removeAllShapes = () => {
    onSetShapes([]);
  };

  const alterShapes = (dataList: IShape[]) => {
    onSetShapes(dataList);
  };

  return {
    addShape,
    addShapes,
    removeShape,
    removeShapes,
    updateShape,
    removeAllShapes,
    updateShapes,
    alterShapes,
  };
};

export default useShape;
