import { GetPropertiesParams } from '@core/common';

export type GetTemplatesResponse = {
  id: string;
  name: string;
  thumbnailUrl: string;
  jsonState: JSON;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type GetTemplatesParams = GetPropertiesParams & {
  screenSizeId?: string;
  userId?: string;
};
