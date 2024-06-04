import { IDesignPrivacy, IGetDesign } from '@modules/design/queries';
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
  selectedPage: number;
  onSetSelectedPage: (page: number) => void;

  data: IGetDesign;
  onSetData: (newData: IGetDesign) => void;

  onlineUserIds: string[];
  onSetOnlineUserIds: (ids: string[]) => void;

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
  selectedPage: 1,
  onSetSelectedPage: (page: number) => set({ selectedPage: page }),

  data: null,
  onSetData: (newData: IGetDesign) => set({ data: newData }),

  onlineUserIds: [],
  onSetOnlineUserIds: (ids: string[]) => set({ onlineUserIds: ids }),

  isExporting: false,
  onSetIsExporting: (isExporting: boolean) => set({ isExporting }),

  isDragging: false,
  onSetIsDragging: (isDragging: boolean) => set({ isDragging }),

  isDrawing: false,
  onSetIsDrawing: (isDrawing: boolean) => set({ isDrawing }),

  selectedItems: [],
  onSetSelectedItems: (newItems: IShape[]) => set({ selectedItems: newItems }),
}));
