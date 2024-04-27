import React, { useCallback, useState } from 'react';
import { useDesignStore } from '../store';
import { IDesignContent } from '../types';
import useShape from './useShape';

type Props = {
  past: IDesignContent[][];
  future: IDesignContent[][];
  setPast: React.Dispatch<React.SetStateAction<IDesignContent[][]>>;
  setFuture: React.Dispatch<React.SetStateAction<IDesignContent[][]>>;
};

const useWorkHistory = ({ past, future, setPast, setFuture }: Props) => {
  const { alterShapes } = useShape();
  const { selectedPage } = useDesignStore();

  const [current, setCurrent] = useState<IDesignContent[] | null>(null);

  const goToPast = useCallback(() => {
    if (past.length > 0 && current) {
      const newFuture = [...current];
      const newStageData = [...past[past.length - 1]];

      setPast((prev) => [...prev.slice(0, past.length - 1)]);
      setFuture((prev) => [...prev, newFuture]);

      setCurrent(newStageData);
      const { shapes } = newStageData.find((page) => page.pageNumber === selectedPage);
      alterShapes(shapes);
    }
  }, [past, current, setPast, setFuture, alterShapes, selectedPage]);

  const goToFuture = useCallback(() => {
    if (future.length > 0 && current) {
      const newPast = [...current];
      const newStageData = future[future.length - 1];

      setFuture((prev) => [...prev.slice(0, future.length - 1)]);
      setPast((prev) => [...prev, newPast]);

      setCurrent(newStageData);
      const { shapes } = newStageData.find((page) => page.pageNumber === selectedPage);
      alterShapes(shapes);
    }
  }, [future, current, setFuture, setPast, alterShapes, selectedPage]);

  const recordPast = useCallback(
    (newCurrent: IDesignContent[]) => {
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
