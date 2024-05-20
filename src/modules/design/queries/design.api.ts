import { newCancelToken, stringify } from '@core/common';
import { httpService } from '@core/common/services/http';
import { GetElementsParams } from './getElements';

const getElements = (params: GetElementsParams) => {
  const queryString = stringify(params);
  return httpService.get(`/elements?${queryString}`, {}, newCancelToken());
};

export { getElements };
