import { useMemo } from 'react';
import { useDesignStore } from '../store';
import { IShape } from '../types';

const useShape = () => {
  const { data, onSetData, selectedPage } = useDesignStore();

  const shapes = useMemo(
    () => data.find((page) => page.pageNumber === selectedPage)?.shapes || [],
    [data, selectedPage],
  );

  const onSetShapes = (shapes: IShape[]) => {
    const newData = data.map((page) => {
      if (page.pageNumber === selectedPage) {
        return {
          ...page,
          shapes: shapes,
        };
      }

      return page;
    });

    onSetData(newData);
  };

  const getShapeById = (id: string) => {
    return shapes.find((shape) => shape.id === id);
  };

  const getShapesByIds = (ids: string[]) => {
    return shapes.filter((shape) => ids.includes(shape.id));
  };

  const addShape = (newShape: IShape) => {
    onSetShapes([...shapes, newShape]);
  };

  const addShapes = (newShapes: IShape[]) => {
    onSetShapes([...shapes, ...newShapes]);
  };

  const updateShape = (shapeId: string, newShape: IShape) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return newShape;
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
    shapes,
    getShapeById,
    addShape,
    addShapes,
    removeShape,
    removeShapes,
    updateShape,
    removeAllShapes,
    updateShapes,
    alterShapes,
    getShapesByIds,
  };
};

export default useShape;
