import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

export type DesignContextProps = {
  pageImages: PageImage[];

  pageImagesStateChange: BehaviorSubject<PageImage[]>;

  addPageImage: (newPageImages: PageImage) => void;
  updatePageImages: (newPageImages: PageImage[]) => void;
};

export const DesignContext = createContext<DesignContextProps | undefined>(undefined);

export const useDesignContext = () => {
  const designActions = useContext(DesignContext);

  if (designActions === undefined) {
    throw new Error(
      'useDesignContext must be used within a DesignProvider. Please wrap your component with a DesignProvider to use this hook.',
    );
  }

  return designActions;
};

export type PageImage = {
  pageNumber: number;
  image: File;
};
const DesignProvider = ({ children }: PropsWithChildren) => {
  const [pageImages, setPageImages] = useState<PageImage[]>([]);

  const pageImagesStateChange = useRef(new BehaviorSubject(pageImages));

  useEffect(() => {
    pageImagesStateChange.current.next(pageImages);
  }, [pageImages]);

  const addPageImage = (newPageImage: PageImage) => {
    setPageImages((prev) => {
      const isExist = prev.some((pageImage) => pageImage.pageNumber === newPageImage.pageNumber);
      if (isExist) {
        return prev.map((pageImage) =>
          pageImage.pageNumber === newPageImage.pageNumber ? newPageImage : pageImage,
        );
      }
      return [...prev, newPageImage];
    });
  };

  const updatePageImages = (newPageImages: PageImage[]) => {
    setPageImages(newPageImages);
  };

  return (
    <DesignContext.Provider
      value={{
        pageImages,
        pageImagesStateChange: pageImagesStateChange.current,
        addPageImage,
        updatePageImages,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export default DesignProvider;
