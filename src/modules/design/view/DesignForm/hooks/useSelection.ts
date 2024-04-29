import { isEmpty } from '@core/common';
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';
import { useEffect, useState } from 'react';
import { useDesignStore } from '../store';
import useTransformer from './useTransformer';

const useSelection = (transformer: ReturnType<typeof useTransformer>) => {
  const [selectedItems, setSelectedItems] = useState<Node[]>([]);
  const { onSetSelectedItems } = useDesignStore();

  useEffect(() => {
    onSetSelectedItems(!isEmpty(selectedItems));
  }, [selectedItems, onSetSelectedItems]);

  const onSelection = (e?: KonvaEventObject<MouseEvent>, itemList?: Node<NodeConfig>[]) => {
    if (transformer === undefined || transformer === null) {
      console.error('transformer is not given');
      return;
    }
    if (!transformer.transformerRef.current) {
      return;
    }

    const list = itemList?.filter((item) => !item.attrs.locked);

    if (!isEmpty(list)) {
      transformer.transformerRef.current.nodes(list as any);
      setSelectedItems(list);
      return;
    } else if (itemList) {
      transformer.transformerRef.current.nodes(itemList as any);
      setSelectedItems(itemList);
    }
    if (!e) {
      return;
    }

    if (e.target.getType() === 'Stage') {
      transformer.transformerRef.current.nodes([]);
      setSelectedItems([]);
      return;
    }

    let newItemList = [] as Node[];
    const targetItem =
      e.target.name() === 'label-text'
        ? e.target.getParent().getParent().findOne('.label-target')
        : e.target;

    if (!e.evt.ctrlKey) {
      newItemList = [targetItem];
    } else if (selectedItems.find((item) => item.id() === targetItem.id())) {
      newItemList = selectedItems.filter((item) => item.id() !== targetItem.id());
    } else {
      newItemList = [...selectedItems, targetItem];
    }

    transformer.transformerRef.current.nodes(newItemList);
    setSelectedItems(newItemList);
  };

  const clearSelection = () => {
    if (transformer.transformerRef.current) {
      transformer.transformerRef.current.nodes([]);
    }
    setSelectedItems([]);
  };

  return {
    selectedItems,
    setSelectedItems,
    onSelection,
    clearSelection,
  };
};

export default useSelection;
