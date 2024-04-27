import { LSHelper } from '@core/common';
import { IShape } from '../types';

const SELECTED_SHAPES = 'selectedShapes';

const useDesignLS = () => {
  const getClipboard = () => {
    return LSHelper.getLSData(SELECTED_SHAPES) as IShape[];
  };

  const setClipboard = (values: IShape[]) => {
    LSHelper.setLSData(SELECTED_SHAPES, values);
  };

  return { getClipboard, setClipboard };
};

export default useDesignLS;
