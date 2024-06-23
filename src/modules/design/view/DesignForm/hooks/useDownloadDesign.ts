import { useGetScreenSizeById } from '@core/queries';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import JsZip from 'jszip';
import { useCallback } from 'react';
import { PageImage, useDesignStore } from '../store';

/**
 * Converts a size from pixels to millimeters based on the DPI.
 * @param sizeInPixels The size in pixels.
 * @param dpi The dots per inch (DPI) for the conversion.
 * @returns The size in millimeters.
 */
function convertPxToMm(sizeInPixels: number, dpi: number = 300): number {
  return (sizeInPixels / dpi) * 25.4;
}

const useDownloadDesign = () => {
  const {
    data: { title, screenSizeId },
  } = useDesignStore();

  const { data: screenSize, isLoading } = useGetScreenSizeById({
    params: {
      id: screenSizeId,
    },
  });

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
    async (pages: PageImage[]) => {
      if (isLoading) return;

      // const { width, height } = type === 'slide' ? POWER_POINT_SIZE : A4_SIZE;
      const width = convertPxToMm(screenSize?.width ?? 0);
      const height = convertPxToMm(screenSize?.height ?? 0);

      const doc = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [width, height],
      });

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
    [title, screenSize, isLoading],
  );

  return { exportImages, exportPdf };
};

export default useDownloadDesign;
