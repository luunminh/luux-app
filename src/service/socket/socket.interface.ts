import { IGetDesign } from '@modules/design/queries';

export interface ServerToClientEvents {
  editing: (data: IGetDesign) => void;
  join: (userId: string[]) => void;
  leave: (userId: string[]) => void;
}

export interface ClientToServerEvents {
  join: (designId: string) => void;
  leave: (designId: string) => void;
  editing: (data: IGetDesign) => void;
}
