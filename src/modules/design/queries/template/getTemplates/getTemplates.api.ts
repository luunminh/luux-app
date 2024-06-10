import { newCancelToken, stringify } from '@core/common';
import { httpService } from '@core/common/services/http';
import { GetTemplatesParams } from './getTemplates.types';

const getTemplates = (params: GetTemplatesParams) => {
  const queryString = stringify(params);
  return httpService.get(`/template?${queryString}`, {}, newCancelToken());
};

export { getTemplates };
