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

  const insertPages = (contents: IDesignContent[]) => {
    const createPage = (content: IDesignContent, pageNumber: number) => ({
      ...content,
      pageNumber,
    });

    const startContents =
      selectedPage === 1 ? data.metadata.slice(0, 1) : data.metadata.slice(0, selectedPage - 1);
    const endContents = data.metadata
      .slice(selectedPage)
      .map((page, idx) => createPage(page, idx + selectedPage + contents.length + 1));

    const formattedContents = contents.map((content, idx) =>
      createPage(content, selectedPage + idx + 1),
    );

    const newData = {
      ...data,
      metadata: [...startContents, ...formattedContents, ...endContents],
    };
    socketService.editDesign(newData);
    onSetSelectedPage(selectedPage + 1);
    onSetData(newData);
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

  return { selectedPage, insertPages, addNewPage, removePage, numberOfPages };
};

export default usePage;
