import { isEmpty } from '@core/common';
import { Box, Title } from '@mantine/core';
import { Node, NodeConfig } from 'konva/lib/Node';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { useTransformer } from '../../hooks';
import { ShapeTypeEnum } from '../../types';
import Configuration from './components';

type Props = {
  transformer: ReturnType<typeof useTransformer>;
};

const ConfigurationAside = forwardRef(
  ({ transformer }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const selectedItems = transformer.transformerRef.current?.nodes() as Node<NodeConfig>[];

    const isMultipleSelection = selectedItems?.length > 1;

    const renderConfigurationItems = useMemo(() => {
      if (isEmpty(selectedItems)) return null;

      if (isMultipleSelection) return <div>Multiple selection</div>;

      const {
        attrs: { id, shapeType, locked },
      } = selectedItems[0];

      if (locked) return <Title>Item has been locked</Title>;

      switch (shapeType) {
        case ShapeTypeEnum.RING:
        case ShapeTypeEnum.STAR:
        case ShapeTypeEnum.CIRCLE:
        case ShapeTypeEnum.ELLIPSE:
        case ShapeTypeEnum.RECTANGLE:
        case ShapeTypeEnum.REGULAR_POLYGON:
        case ShapeTypeEnum.IMAGE:
          return <Configuration.Shape id={id} />;
        case ShapeTypeEnum.TEXT:
          return <Configuration.Text id={id} />;
      }
    }, [isMultipleSelection, selectedItems]);

    return (
      <Box p={24} ref={ref}>
        <Title mb={12} order={3} c="cyan">
          Configuration
        </Title>
        {renderConfigurationItems}
      </Box>
    );
  },
);

export default ConfigurationAside;
