import { getRandomId } from '@core/common';
import { Card } from '@mantine/core';
import { IElement } from '@modules/design/queries';
import { PropsWithChildren } from 'react';
import { useShape } from '../../../hooks';
import { useDesignStore } from '../../../store';
import { IShape, ShapeTypeEnum } from '../../../types';
import { DrawSection } from './DrawSection';
import { ElementSection } from './ElementSection';
import { TemplateSection } from './TemplateSection';
import { UploadSection } from './UploadSection';

const Section = {
  Draw: DrawSection,
  Upload: UploadSection,
  Element: ElementSection,
  Template: TemplateSection,
};

type ItemWrapperProps = PropsWithChildren & {
  element: IElement;
};

export const ItemWrapper = ({ children, element }: ItemWrapperProps) => {
  const { addShapes } = useShape();
  const { scale } = useDesignStore();

  const handleAddElement = (elm: IElement) => {
    const shapes: IShape[] = [];
    const groupId = getRandomId();
    const jsonStates: any[] = JSON.parse(elm.jsonState);

    jsonStates.forEach((shapeAttrs) => {
      const id = getRandomId();

      const newShape = {
        id: id,
        attrs: {
          ...(shapeAttrs as any),
          ...(jsonStates.length > 1 && { group: groupId }),
          scaleX: 1 / scale,
          scaleY: 1 / scale,
          ...((shapeAttrs?.fontSize || shapeAttrs?.shapeType === ShapeTypeEnum.TEXT) && {
            fontSize: Math.floor((shapeAttrs?.fontSize || 50) / scale),
            width: Math.floor(shapeAttrs?.width / scale),
            height: Math.floor(shapeAttrs?.height / scale),
            scaleX: 1,
            scaleY: 1,
          }),
          //@ts-ignore
          // layerIdx: shapeAttrs?.layerIdx || 0,
          id,
        },
      };
      shapes.push(newShape);
    });

    addShapes(shapes);
  };

  return (
    <Card
      mah={144}
      h="100%"
      shadow="sm"
      padding="lg"
      radius="md"
      style={{ cursor: 'pointer' }}
      onClick={() => handleAddElement(element)}
    >
      {children}
    </Card>
  );
};

export default Section;
