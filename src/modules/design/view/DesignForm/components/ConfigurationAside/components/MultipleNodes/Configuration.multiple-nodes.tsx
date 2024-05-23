import { getRandomId, isEmpty } from '@core/common';
import { useShape, useTransformer } from '@design/hooks';
import { IShape, ShapeTypeEnum } from '@design/types';
import { ActionIcon, ColorInput, Flex, InputWrapper, Slider, Stack, Tooltip } from '@mantine/core';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import { Node, NodeConfig } from 'konva/lib/Node';
import { useState } from 'react';
import { FaLayerGroup as GroupIcon, FaObjectUngroup as UnGroupIcon } from 'react-icons/fa';

type Props = {
  transformer: ReturnType<typeof useTransformer>;
};

const LINE_NODE_TYPES = [ShapeTypeEnum.ARROW, ShapeTypeEnum.LINE];

const ConfigurationMultipleNodes = ({ transformer }: Props) => {
  const { updateShapes } = useShape();
  const { onSetSelectedItems } = useDesignStore();

  const selectedItems = transformer.transformerRef.current?.nodes() as Node<NodeConfig>[];

  const [opacity, setOpacity] = useState<number>(1);
  const [color, setColor] = useState<string>('#000');

  const [hasGroup, setHasGroup] = useState<boolean>(
    selectedItems.some((item) => !isEmpty(item.attrs?.group)),
  );
  const handleChangeShapes = (
    key: string,
    value: string | number | string[] | number[] | boolean | any,
  ) => {
    const updatedShapes = selectedItems.map((item) => {
      let newKey = key;
      if (key === 'fill') {
        if (LINE_NODE_TYPES.includes(item.attrs.shapeType)) {
          newKey = 'stroke';
        }
      }
      return {
        id: item.id(),
        attrs: {
          ...item.attrs,
          [newKey]: value,
        },
      };
    }) as IShape[];

    updateShapes(
      selectedItems.map((item) => item.id()),
      updatedShapes,
    );
  };

  const handleGroupShapes = () => {
    setHasGroup(true);

    const groupIds = getRandomId();
    const groupShapes = selectedItems.map((item) => ({
      ...item,
      id: item.id(),
      attrs: {
        ...item.attrs,
        group: groupIds,
      },
    }));

    updateShapes(
      selectedItems.map((item) => item.id()),
      groupShapes,
    );
  };

  const handleUnGroupShapes = () => {
    setHasGroup(false);

    const unGroupShapes = selectedItems.map((item) => ({
      ...item,
      id: item.id(),
      attrs: {
        ...item.attrs,
        group: undefined,
      },
    }));

    updateShapes(
      selectedItems.map((item) => item.id()),
      unGroupShapes,
    );

    transformer.transformerRef.current.nodes([]);
    onSetSelectedItems([]);
  };

  return (
    <Stack gap={16}>
      <Flex gap={16}>
        <Tooltip withArrow label="Group">
          <ActionIcon disabled={hasGroup} onClick={handleGroupShapes} variant="subtle" size="xl">
            {<GroupIcon size={30} />}
          </ActionIcon>
        </Tooltip>

        <Tooltip withArrow label="UnGroup">
          <ActionIcon disabled={!hasGroup} onClick={handleUnGroupShapes} variant="subtle" size="xl">
            {<UnGroupIcon size={30} />}
          </ActionIcon>
        </Tooltip>
      </Flex>
      <InputWrapper label="Transparent">
        <Slider
          label={opacity * 100}
          color="blue"
          value={opacity * 100 || 100}
          onChange={(newOpacity) => {
            const val = Number(newOpacity) / 100;
            setOpacity(val);
            handleChangeShapes('opacity', val);
          }}
        />
      </InputWrapper>
      <ColorInput
        label="Color"
        value={color}
        onChange={(newColor) => {
          setColor(newColor);
          handleChangeShapes('fill', newColor);
        }}
      />
    </Stack>
  );
};

export default ConfigurationMultipleNodes;
