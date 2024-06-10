import { IDesignPrivacy } from '../getDesignById';

export interface CreateDesignPayload {
  title: string;
  metadata: any;
  privacy: IDesignPrivacy;
  createdByUserId: string;
  screenSizeId: string;
  thumbnailUrl: string;
}
