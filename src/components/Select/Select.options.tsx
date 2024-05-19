import { Flex, Loader } from '@mantine/core';
import _ from 'lodash';
import React, { memo } from 'react';
import { components } from 'react-select';
import { LazyCheckPoint } from '../../modules/shared/components/LazyCheckPoint';
import { SelectOption, SelectOptionsProps } from './Select.types';

/**
 * Enables options such as lazy loading and customization within the select component.
 */
const SelectOptions = ({
  customOption: CustomOptionComponent,
  allowLazyLoading,
  onFetchNextPage,
  hasNextPage,
  isFetching,
  ...props
}: SelectOptionsProps) => {
  const { children, data, options } = props;
  const isValidCustomOptionCmp =
    CustomOptionComponent && React.isValidElement(<CustomOptionComponent />);

  const getOption = () => {
    const lastOption = options[options.length - 1] as SelectOption;
    const isLastOption =
      _.isEqual(lastOption.value, data.value) || _.isEqual(lastOption, data.value);

    if (allowLazyLoading && hasNextPage && onFetchNextPage && !isFetching && isLastOption) {
      return (
        <LazyCheckPoint
          onInView={() => {
            onFetchNextPage();
          }}
          useInViewProps={{
            triggerOnce: true,
          }}
          key={`select-checkpoint-${data.value}`}
        >
          {isValidCustomOptionCmp ? <CustomOptionComponent {...props} /> : children}
        </LazyCheckPoint>
      );
    }

    return (
      <>
        {isValidCustomOptionCmp ? <CustomOptionComponent {...props} /> : children}

        {isFetching && isLastOption && (
          <Flex justify="center" align="center">
            <Loader size={18} />
          </Flex>
        )}
      </>
    );
  };

  const option = getOption();

  return <components.Option {...props}>{option}</components.Option>;
};

export default memo(SelectOptions, (prevProps: any, nextProps: any) => {
  const keys = [
    'data',
    'hasNextPage',
    'onFetchNextPage',
    'allowLazyLoading',
    'customOption',
    'options',
  ];
  return !keys.some((key) => {
    if (typeof prevProps[key] === 'object') {
      return !_.isEqual(prevProps[key], nextProps[key]);
    }

    return prevProps[key] !== nextProps[key];
  });
});
