import Konva from 'konva';
import { useRef } from 'react';
import { IShape } from '../types';
import useShape from './useShape';

const useTransformer = () => {
  const transformerRef = useRef<Konva.Transformer>(null);

  const { updateShape } = useShape();

  const onTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const updatedShaped: IShape = {
      id: e.target.id(),
      attrs: e.target.getAttrs() as any,
    };

    updateShape(e.target.id(), updatedShaped);

    e.target.getStage()?.batchDraw();
  };

  return { transformerRef, onTransformEnd };
};

export default useTransformer;
