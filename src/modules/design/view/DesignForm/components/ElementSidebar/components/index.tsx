import { Callback } from '@core/common';
import { Card } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { DrawSection } from './DrawSection';
import { ElementSection } from './ElementSection';
import { ShapeSection } from './ShapeSection';
import { TemplateSection } from './TemplateSection';
import { TextSection } from './TextSection';
import { UploadSection } from './UploadSection';

const Section = {
  Draw: DrawSection,
  Text: TextSection,
  Upload: UploadSection,
  Element: ElementSection,
  Template: TemplateSection,
  Shape: ShapeSection,
};

type ItemWrapperProps = PropsWithChildren & {
  onClickItem: Callback;
};

export const ItemWrapper = ({ children, onClickItem }: ItemWrapperProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" onClick={onClickItem}>
      <Card.Section
        display="flex"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Card.Section>
    </Card>
  );
};

type SectionPaginationProps = {};

export const SectionPagination = ({}: SectionPaginationProps) => {};

export default Section;
