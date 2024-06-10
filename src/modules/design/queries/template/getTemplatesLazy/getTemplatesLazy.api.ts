import { newCancelToken, stringify } from '@core/common';
import { httpService } from '@core/common/services/http';
import { GetTemplatesLazyParams } from './getTemplatesLazy.types';

const getTemplates = (params: GetTemplatesLazyParams) => {
  const queryString = stringify(params);
  return httpService.get(`/template?${queryString}`, {}, newCancelToken());
};

export { getTemplates };
