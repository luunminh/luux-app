import { BaseShape, ShapeTypeEnum } from '@design/types';
import Konva from 'konva';
import { forwardRef, useEffect, useState } from 'react';
import { Image } from 'react-konva';
import { useImage } from 'react-konva-utils';
import useSvgContent from './useSvgContent';

type Props = BaseShape[ShapeTypeEnum.CUSTOM];

/** @tutorial https://github.com/konvajs/react-konva/issues/530
 * 1. Manually download the content of SVG image
 * 2. Parse it with DOMParser.
 * 3. Find elements with properties you need
 * 4. Change that properties
 * 5. Serialize SVG to dataURL
 * 6. Use that dataURL for Image component.
 */
const CustomShape = forwardRef<Konva.Image, Props>(({ colors, src, ...props }: Props, ref) => {
  const { svgContent, loading } = useSvgContent(src);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (svgContent) {
      let parser = new DOMParser();
      let svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');

      // Get all elements with a fill attribute
      let elements = svgDoc.querySelectorAll('[fill]');

      colors.forEach((color, index) => {
        // Replace the fill color in the SVG for each color
        if (elements[index]) {
          elements[index].setAttribute('fill', color);
        }
      });

      // Serialize SVG to dataURL
      const svg = new XMLSerializer().serializeToString(svgDoc);
      const newImgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

      setImgUrl(newImgUrl);
    }
  }, [svgContent, colors]);

  const [img] = useImage(imgUrl);

  if (loading || !imgUrl) return null;

  return <Image ref={ref} image={img} colors={colors} src={src} {...props} />;
});

export default CustomShape;
