import { newCancelToken, stringify } from '@core/common';
import { httpService } from '@core/common/services/http';
import { CreateDesignPermissionPayload } from './createDesignPermission';
import { DeleteDesignPermissionPayload } from './deleteDesignPermission';
import { GetElementsParams } from './getElements';
import { UpdateDesignPermissionPayload } from './updateDesignPermission';

const getElements = (params: GetElementsParams) => {
  const queryString = stringify(params);
  return httpService.get(`/elements?${queryString}`, {}, newCancelToken());
};

const getDesignById = (params: { id: string }) => {
  return httpService.get(`/design/${params.id}`, {}, newCancelToken());
};

const createDesignPermission = (payload: CreateDesignPermissionPayload) => {
  return httpService.post('/design/permission', payload, newCancelToken());
};

const updateDesignPermission = (payload: UpdateDesignPermissionPayload) => {
  const { designId, userId, ...restPayload } = payload;
  return httpService.put(`/design/permission/${designId}/${userId}`, restPayload, newCancelToken());
};

const deleteDesignPermission = (payload: DeleteDesignPermissionPayload) => {
  return httpService.delete(
    `/design/permission/${payload.designId}/${payload.userId}`,
    {},
    newCancelToken(),
  );
};

export {
  createDesignPermission,
  deleteDesignPermission,
  getDesignById,
  getElements,
  updateDesignPermission,
};
