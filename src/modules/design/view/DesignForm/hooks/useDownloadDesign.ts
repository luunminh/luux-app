import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import JsZip from 'jszip';
import { useCallback } from 'react';
import { PageImage, useDesignStore } from '../store';

const A4_SIZE = {
  width: 210,
  height: 297,
};

const POWER_POINT_SIZE = {
  width: 254,
  height: 190.5,
};

const useDownloadDesign = () => {
  const {
    data: { title },
  } = useDesignStore();
  const exportImages = useCallback(
    async (pages: PageImage[]) => {
      const zip = new JsZip();

      for (const page of pages) {
        zip.file(`page_${page.pageNumber}.png`, page.image, { binary: true });
      }

      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, `${title}.zip`);
      });
    },
    [title],
  );

  const exportPdf = useCallback(
    async (pages: PageImage[], type: 'slide' | 'doc' = 'doc') => {
      const doc = new jsPDF();

      const { width, height } = type === 'slide' ? POWER_POINT_SIZE : A4_SIZE;

      const imgDataPromises = pages.map(
        (page) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(page.image);
          }),
      );

      const imgDataArray = await Promise.all(imgDataPromises);

      for (let i = 0; i < imgDataArray.length; i++) {
        doc.addImage(imgDataArray[i], 'PNG', 0, 0, width, height);

        if (i < imgDataArray.length - 1) {
          doc.addPage();
        }
      }

      doc.save(`${title}.pdf`);
    },
    [title],
  );

  return { exportImages, exportPdf };
};

export default useDownloadDesign;
