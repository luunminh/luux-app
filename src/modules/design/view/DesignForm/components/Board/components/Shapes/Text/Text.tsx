import { useComponentDidMount, useFonts } from '@core/common';
import { useGetFonts } from '@core/queries';
import { BaseShape, ShapeTypeEnum } from '@design/types';
import Konva from 'konva';
import { forwardRef, useEffect, useState } from 'react';
import { Text as KonvaText } from 'react-konva';

type Props = BaseShape[ShapeTypeEnum.REGULAR_POLYGON];

const Text = forwardRef<Konva.Text, Props>(({ fontFamily, ...props }: Props, ref) => {
  const { createFontFaces, loadFontFace } = useFonts([], false);
  const [isLoading, setLoading] = useState(true);
  const { setParams, fonts } = useGetFonts();
  const font = fonts[0];

  useComponentDidMount(() => {
    setParams({ skip: 0, take: 10, names: [fontFamily] });
  });

  useEffect(() => {
    if (font) {
      const fontFaces = createFontFaces(font);

      Promise.all(fontFaces.map((fontFace) => loadFontFace(fontFace)))
        .then(() => {})
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [font]);

  if (isLoading) return null;

  return <KonvaText ref={ref} fontFamily={fontFamily} {...props} />;
});

export default Text;
