import { COLOR_CODE, isEmpty } from '@core/common';
import _ from 'lodash';
import React, { FocusEvent, forwardRef, useCallback, useId, useMemo } from 'react';
import { ActionMeta, GroupBase, SelectInstance, Theme } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { SelectOption, SelectOptionsProps, SelectProps } from '.';
import SelectOptions from './Select.options';
import { getSelectCustomStyles, getSelectTheme } from './Select.styles';

/**
 * `import { Select } from '@puravida/react-ui';`
 *
 * - [Select API](https://lms-react-ui.web.app/?path=/docs/inputs-select--docs)
 */
const Select = forwardRef(
  (
    {
      label,
      options = [],
      errorMessage,
      required,
      styles,
      onChange,
      value,
      isMulti,
      placeholder,
      noOptionsMessage = (inputValue) =>
        inputValue?.inputValue ? 'Not found.' : 'Type to search...',
      customSelectedOptionValue,
      keepOptionOnChange = false,

      hasNextPage,
      onFetchNextPage,
      allowLazyLoading,
      customOptionComponent,
      components,
      isLoading,
      allowCreateOption = false,
      limitSelectedOptions = 0,
      onFocus,
      onBlur,
      ...props
    }: SelectProps,
    ref: React.Ref<SelectInstance<SelectOption, boolean, GroupBase<SelectOption>>>,
  ) => {
    const id = `select-${useId()}`;
    const [limitOptions, setLimitOptions] = React.useState<number>(limitSelectedOptions);

    const hasError = !isEmpty(errorMessage);

    const selectStyles: SelectProps['styles'] = useMemo(
      () => getSelectCustomStyles(styles, COLOR_CODE, hasError),
      [styles, hasError],
    );

    const getTheme = useCallback(
      (theme: Theme) => getSelectTheme(theme, COLOR_CODE, hasError),
      [hasError],
    );

    const handleChange = (newValue: any, { name }: ActionMeta<SelectOption>) => {
      if (onChange) {
        if (isMulti) {
          const selectedOptionValues = keepOptionOnChange
            ? newValue
            : newValue.map((val: any) => val?.value ?? null);

          return onChange(name, selectedOptionValues);
        }

        const selectedOptionValues = keepOptionOnChange ? newValue : newValue?.value ?? null;

        return onChange(name, selectedOptionValues);
      }
    };

    const selectedOption = isMulti
      ? options?.filter((option: any) => {
          return value?.includes(option.value);
        }) || null
      : options?.find((option: any) => {
          return _.isEqual(option?.value, value);
        }) || null;

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      if (limitSelectedOptions !== 0) {
        setLimitOptions(0);
      }
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setLimitOptions(limitSelectedOptions);

      if (onBlur) {
        onBlur(event);
      }
    };

    return (
      <CreatableSelect
        id={id}
        ref={ref}
        theme={getTheme}
        isMulti={isMulti}
        options={options}
        isLoading={isLoading}
        styles={selectStyles}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        menuPortalTarget={document.body}
        noOptionsMessage={noOptionsMessage}
        value={customSelectedOptionValue ?? selectedOption}
        {...(placeholder && {
          placeholder: placeholder,
        })}
        components={{
          ...components,
          Option: (props: SelectOptionsProps) => (
            <SelectOptions
              isFetching={isLoading}
              hasNextPage={hasNextPage}
              onFetchNextPage={onFetchNextPage}
              allowLazyLoading={allowLazyLoading}
              customOption={customOptionComponent}
              {...props}
            />
          ),
        }}
        // disable create option
        {...(!allowCreateOption && {
          isValidNewOption: () => false,
        })}
        {...props}
      />
    );
  },
);

export default Select;
