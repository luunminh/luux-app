import { GetPropertiesParams } from '@core/common';

export type GetTemplatesLazyResponse = {
  id: string;
  name: string;
  thumbnailUrl: string;
  jsonState: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  createdByUser: {
    id: string;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
  };
  screenSize: {
    id: string;
    name: string;
  };
};

export type GetTemplatesLazyParams = GetPropertiesParams & {
  screenSizeId?: string;
  userId?: string;
};

export enum TemplateQueryKeys {
  SCREEN_SIZE = 'screenSizeId',
  USER_ID = 'userId',
}
