import { IDesignPrivacy, IGetDesign } from '@modules/design/queries';
import { IDesignUser } from 'src/service';
import { create } from 'zustand';
import { IDesignContent, IShape } from '../types';

export const DEFAULT_CONTENT: IDesignContent[] = [{ pageNumber: 1, shapes: [] }];

export const DEFAULT_DESIGN = ({
  userId,
  screenSizeId,
}: {
  userId: string;
  screenSizeId: string;
}): Omit<IGetDesign, 'id'> => {
  return {
    title: 'Untitled Design',
    metadata: DEFAULT_CONTENT,
    privacy: IDesignPrivacy.PRIVATE,
    createdByUserId: userId,
    screenSizeId: screenSizeId,
    thumbnailUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: '',
  };
};

type DesignStore = {
  scale: number;
  onSetScale: (scale: number) => void;

  selectedPage: number;
  onSetSelectedPage: (page: number) => void;

  data: IGetDesign;
  onSetData: (newData: IGetDesign) => void;

  onlineUsers: IDesignUser[];
  onSetOnlineUsers: (users: IDesignUser[]) => void;

  isExporting: boolean;
  onSetIsExporting: (isExporting: boolean) => void;

  isDragging: boolean;
  onSetIsDragging: (isDragging: boolean) => void;

  isDrawing: boolean;
  onSetIsDrawing: (isDrawing: boolean) => void;

  selectedItems: IShape[];
  onSetSelectedItems: (newItems: IShape[]) => void;
};

export const useDesignStore = create<DesignStore>((set) => ({
  scale: 1,
  onSetScale: (scale: number) => set({ scale }),

  selectedPage: 1,
  onSetSelectedPage: (page: number) => set({ selectedPage: page }),

  data: null,
  onSetData: (newData: IGetDesign) => set({ data: newData }),

  onlineUsers: [],
  onSetOnlineUsers: (users: IDesignUser[]) => set({ onlineUsers: users }),

  isExporting: false,
  onSetIsExporting: (isExporting: boolean) => set({ isExporting }),

  isDragging: false,
  onSetIsDragging: (isDragging: boolean) => set({ isDragging }),

  isDrawing: false,
  onSetIsDrawing: (isDrawing: boolean) => set({ isDrawing }),

  selectedItems: [],
  onSetSelectedItems: (newItems: IShape[]) => set({ selectedItems: newItems }),
}));
