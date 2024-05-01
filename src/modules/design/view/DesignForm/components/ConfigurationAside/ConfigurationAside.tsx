import { isEmpty } from '@core/common';
import { Box, Stack, Title } from '@mantine/core';
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

      if (isMultipleSelection) return <Configuration.Nodes transformer={transformer} />;

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
          return (
            <Stack gap={16}>
              <Configuration.Text id={id} />
              <Configuration.Shape id={id} />
            </Stack>
          );
        case ShapeTypeEnum.LINE:
        case ShapeTypeEnum.ARROW:
          return (
            <Stack gap={16}>
              <Configuration.Line id={id} />
              <Configuration.Shape id={id} />
            </Stack>
          );
      }
    }, [isMultipleSelection, selectedItems, transformer]);

    return (
      <Box
        p={24}
        ref={ref}
        style={{
          overflowY: 'auto',
        }}
      >
        <Title mb={12} order={3} c="cyan">
          Configuration
        </Title>
        {renderConfigurationItems}
      </Box>
    );
  },
);

export default ConfigurationAside;
