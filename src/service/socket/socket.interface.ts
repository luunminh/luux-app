import { IGetDesign } from '@modules/design/queries';

export type IDesignUser = {
  id: string;
  name: string;
  x?: number;
  y?: number;
};

export type IDesignPayload = {
  designId: string;
  x?: number;
  y?: number;
};
export interface ServerToClientEvents {
  editing: (data: IGetDesign) => void;
  join: (users: IDesignUser[]) => void;
  leave: (users: IDesignUser[]) => void;
}

export interface ClientToServerEvents {
  join: (payload: IDesignPayload) => void;
  leave: (payload: IDesignPayload) => void;
  editing: (data: IGetDesign) => void;
}
