import { ToastService } from '@core/common';
import { useEffect, useState } from 'react';

const useSvgContent = (url: string) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((data) => setSvgContent(data))
      .catch((error) => {
        ToastService.error(error.message || 'Failed to fetch SVG content');
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { svgContent, loading };
};

export default useSvgContent;
