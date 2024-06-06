import { Callback, isEmpty } from '@core/common';
import { ActionIcon, Stack, TextInput } from '@mantine/core';
import { debounce } from 'lodash';
import React, { Ref, forwardRef } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { MdClear } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

type Props = {
  searchText?: string;
  searchKey?: string;
  pageKey?: string;
  placeholder?: string;
  ref?: Ref<HTMLDivElement>;
  label?: string;
  onSearch?: (_text: string) => void;
  onInputTouch?: Callback;
  interceptorAction?: (..._args: any[]) => boolean | Promise<boolean>;
};

const TableSearch = forwardRef(
  (
    {
      searchText,
      placeholder = 'Search',
      searchKey = 'search',
      pageKey = 'page',
      onSearch,
      onInputTouch,
      interceptorAction,
    }: Props,
    ref,
  ) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParam = searchText || searchParams.get(searchKey) || '';

    const [searchValue, setSearchValue] = React.useState(searchParam);
    const onSearchFunc = async (val: string) => {
      if (onSearch) return onSearch(val);

      if (val) searchParams.set(searchKey, val);
      else searchParams.delete(searchKey);

      searchParams.delete(pageKey);

      setSearchParams(searchParams);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceValue = React.useCallback(debounce(onSearchFunc, 500), [searchParams]);

    const hasValue = !isEmpty(searchParam);

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const { value } = event.target;
      setSearchValue(value);
      debounceValue(value);
    };

    const handleClearSearchValue = async () => {
      if (!!interceptorAction) {
        const allowContinue = await interceptorAction();
        if (!allowContinue) return;
      }
      setSearchValue('');
      onSearchFunc('');
    };

    return (
      <Stack>
        <TextInput
          placeholder={placeholder}
          size="md"
          value={searchValue}
          onChange={handleTextChange}
          {...(onInputTouch && {
            onClick: onInputTouch,
          })}
          {...(hasValue && {
            rightSection: (
              <ActionIcon variant="transparent" onClick={handleClearSearchValue}>
                <MdClear />
              </ActionIcon>
            ),
          })}
          leftSection={<IoSearchSharp />}
        />
      </Stack>
    );
  },
);

export default TableSearch;
