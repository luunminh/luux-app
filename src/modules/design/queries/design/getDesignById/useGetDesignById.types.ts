import { MyProfile } from '@core/queries';
import { IDesignContent } from '@modules/design/view/DesignForm';

export enum IDesignPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  CUSTOMIZE = 'CUSTOMIZE',
}

export interface IGetDesignUser extends MyProfile {
  canView: boolean;
  canEdit: boolean;
}

export interface IGetDesign {
  id: string;
  title: string;
  privacy: IDesignPrivacy;
  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
  metadata: IDesignContent[];
  deletedAt: string;
  thumbnailUrl: string;
  screenSizeId: string;
  users?: IGetDesignUser[];
}
