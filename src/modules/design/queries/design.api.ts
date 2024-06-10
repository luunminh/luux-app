import { newCancelToken, stringify } from '@core/common';
import { httpService } from '@core/common/services/http';
import { CreateDesignPayload, GetDesignsParams } from './design';
import {
  CreateDesignPermissionPayload,
  DeleteDesignPermissionPayload,
  UpdateDesignPermissionPayload,
} from './designPermission';
import { GetElementsParams } from './element';

const getElements = (params: GetElementsParams) => {
  const queryString = stringify(params);
  return httpService.get(`/elements?${queryString}`, {}, newCancelToken());
};

const getDesigns = (params: GetDesignsParams) => {
  const queryString = stringify(params);
  return httpService.get(`/designs?${queryString}`, {}, newCancelToken());
};

const getDesignById = (params: { id: string }) => {
  return httpService.get(`/design/${params.id}`, {}, newCancelToken());
};

const createDesign = (payload: CreateDesignPayload) => {
  return httpService.post('/design', payload, newCancelToken());
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
  createDesign,
  createDesignPermission,
  deleteDesignPermission,
  getDesignById,
  getDesigns,
  getElements,
  updateDesignPermission,
};
