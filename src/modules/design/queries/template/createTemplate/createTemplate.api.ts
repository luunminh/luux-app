import { newCancelToken } from '@core/common';
import { httpService } from '@core/common/services/http';
import { CreateTemplatePayload } from '.';

const createTemplate = (payload: CreateTemplatePayload) => {
  return httpService.post(`/template`, payload, newCancelToken());
};

export { createTemplate };
