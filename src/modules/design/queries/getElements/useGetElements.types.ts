import { GetPropertiesParams } from '@core/common';
import { IShape } from '@design/types';

export interface IElement {
  id: string;
  name: string;
  jsonState: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
  category: {
    id: string;
    displayName: string;
  };
}

export interface GetElementsParams extends GetPropertiesParams {
  categoryIds?: string[];
  search?: string;
}

export interface IConvertJsonState extends Pick<IShape, 'attrs'> {}
