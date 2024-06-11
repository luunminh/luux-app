import { newCancelToken } from '@core/common';
import { httpService } from '@core/common/services/http';
import { DeleteTemplatePayload } from '.';

const deleteTemplate = (payload: DeleteTemplatePayload) => {
  const { id, ...restPayload } = payload;
  return httpService.delete(`/template/${id}`, { ...restPayload }, newCancelToken());
};

export { deleteTemplate };
