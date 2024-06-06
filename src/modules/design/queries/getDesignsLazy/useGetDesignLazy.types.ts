import { GetPropertiesParams } from '@core/common';
import { IScreenSize, MyProfile } from '@core/queries';

export interface IGetDesigns {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  privacy: string;
  createdByUser: IGetDesignsUser;
  screenSize: IGetDesignsScreenSize;
  sharedUsers: IGetDesignsUser[];
}

export interface IGetDesignsUser extends MyProfile {}

export interface IGetDesignsScreenSize extends IScreenSize {}

export interface GetDesignsParams extends GetPropertiesParams {
  screenSizeId?: string;
  type: DesignUserType;
}

export enum DesignQueryKeys {
  SCREEN_SIZE = 'screenSizeId',
  OWNER_TYPE = 'type',
}

export enum DesignUserType {
  OWNER = 'OWNER',
  SHARED = 'SHARED',
}
