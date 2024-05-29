import { getRandomId } from '@core/common';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import JsZip from 'jszip';
import { useCallback } from 'react';
import { PageImage } from '../store';

const useDownloadDesign = () => {
  const exportImages = useCallback(async (pages: PageImage[]) => {
    const zip = new JsZip();

    for (const page of pages) {
      zip.file(`page_${page.pageNumber}.png`, page.image, { binary: true });
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${getRandomId()}.zip`);
    });
  }, []);

  const exportPdf = useCallback(async (pages: PageImage[]) => {
    const doc = new jsPDF();
    console.log('pdf');

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
      doc.addImage(imgDataArray[i], 'PNG', 0, 0, 0, 0);

      if (i < imgDataArray.length - 1) {
        doc.addPage();
      }
    }

    doc.save(`${getRandomId()}.pdf`);
  }, []);

  return { exportImages, exportPdf };
};

export default useDownloadDesign;
