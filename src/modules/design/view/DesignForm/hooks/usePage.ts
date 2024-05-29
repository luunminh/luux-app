import { useDesignStore } from '../store';
import { IDesignContent, IShape } from '../types';

const usePage = () => {
  const { data, onSetData, onSetSelectedPage, selectedPage } = useDesignStore();
  const numberOfPages = data.length;

  const addNewPage = (shapeData?: IShape[]) => {
    const newPage: IDesignContent = {
      pageNumber: data.length + 1,
      shapes: shapeData || [],
    };

    onSetData([...data, newPage]);
    onSetSelectedPage(newPage.pageNumber);
  };

  const removePage = (pageIdx: number) => {
    const newPages = data
      .filter((page) => page.pageNumber !== pageIdx)
      .map((page, idx) => ({ ...page, pageNumber: idx + 1 }));

    onSetData(newPages);

    const newSelectedPageIndex = selectedPage > 1 ? selectedPage - 1 : 1;
    onSetSelectedPage(newSelectedPageIndex);
  };

  return { selectedPage, addNewPage, removePage, numberOfPages };
};

export default usePage;
