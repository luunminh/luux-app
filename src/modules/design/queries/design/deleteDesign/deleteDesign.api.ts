import { newCancelToken } from '@core/common';
import { httpService } from '@core/common/services/http';
import { DeleteDesignPayload } from '.';

const deleteDesign = (payload: DeleteDesignPayload) => {
  const { id, ...restPayload } = payload;
  return httpService.delete(`design/${id}`, { ...restPayload }, newCancelToken());
};

export { deleteDesign };
