import { socketService } from '@core/common';
import { useDesignStore } from '../store';
import { IDesignContent, IShape } from '../types';

const usePage = () => {
  const { data, onSetData, onSetSelectedPage, selectedPage } = useDesignStore();
  const numberOfPages = data?.metadata?.length || 1;

  const addNewPage = (shapeData?: IShape[]) => {
    const newPage: IDesignContent = {
      pageNumber: data.metadata.length + 1,
      shapes: shapeData || [],
    };

    const newData = { ...data, metadata: [...data?.metadata, newPage] };
    socketService.editDesign(newData);

    onSetData(newData);
    onSetSelectedPage(newPage.pageNumber);
  };

  const removePage = (pageIdx: number) => {
    const newPages = data.metadata
      .filter((page) => page.pageNumber !== pageIdx)
      .map((page, idx) => ({ ...page, pageNumber: idx + 1 }));

    const newData = { ...data, metadata: newPages };
    socketService.editDesign(newData);

    onSetData(newData);

    const newSelectedPageIndex = selectedPage > 1 ? selectedPage - 1 : 1;
    onSetSelectedPage(newSelectedPageIndex);
  };

  return { selectedPage, addNewPage, removePage, numberOfPages };
};

export default usePage;
