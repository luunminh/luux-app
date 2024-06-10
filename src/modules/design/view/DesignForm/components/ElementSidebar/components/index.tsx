import { getRandomId } from '@core/common';
import { Card } from '@mantine/core';
import { IConvertJsonState, IElement } from '@modules/design/queries';
import { PropsWithChildren } from 'react';
import { useShape } from '../../../hooks';
import { IShape } from '../../../types';
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

  const handleAddElement = (elm: IElement) => {
    const shapes: IShape[] = [];
    const groupId = getRandomId();
    const jsonStates: IConvertJsonState[] = JSON.parse(elm.jsonState);

    jsonStates.forEach((shapeAttrs) => {
      const id = getRandomId();
      shapes.push({
        id: id,
        attrs: {
          ...(shapeAttrs as any),
          ...(jsonStates.length > 1 && { group: groupId }),
          id,
        },
      });
    });

    addShapes(shapes);
  };

  return (
    <Card
      mah={90}
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
