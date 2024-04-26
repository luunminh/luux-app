import React, { useCallback, useState } from 'react';
import { IShape } from '../types';
import useShape from './useShape';

type Props = {
  past: IShape[][];
  future: IShape[][];
  setPast: React.Dispatch<React.SetStateAction<IShape[][]>>;
  setFuture: React.Dispatch<React.SetStateAction<IShape[][]>>;
};

const useWorkHistory = ({ past, future, setPast, setFuture }: Props) => {
  const { alterShapes } = useShape();
  const [current, setCurrent] = useState<IShape[] | null>(null);

  const goToPast = useCallback(() => {
    if (past.length > 0 && current) {
      const newFuture = [...current];
      const newStageData = [...past[past.length - 1]];

      setPast((prev) => [...prev.slice(0, past.length - 1)]);
      setFuture((prev) => [...prev, newFuture]);

      setCurrent(newStageData);
      alterShapes(newStageData);
    }
  }, [past, current, setPast, setFuture, alterShapes]);

  const goToFuture = useCallback(() => {
    if (future.length > 0 && current) {
      const newPast = [...current];
      const newStageData = future[future.length - 1];

      setFuture((prev) => [...prev.slice(0, future.length - 1)]);
      setPast((prev) => [...prev, newPast]);

      setCurrent(newStageData);
      alterShapes(newStageData);
    }
  }, [future, current, setFuture, setPast, alterShapes]);

  const recordPast = useCallback(
    (newCurrent: IShape[]) => {
      if (newCurrent.length !== 0 && current !== null) {
        if (JSON.stringify(newCurrent) !== JSON.stringify(current)) {
          setPast((prev) => [...prev, current]);
          setFuture([]);
        }
      }

      if (newCurrent.length !== 0) {
        setCurrent(newCurrent);
      }
    },
    [current, setPast, setFuture, setCurrent],
  );

  return {
    goToPast,
    goToFuture,
    recordPast,
  };
};

export default useWorkHistory;
