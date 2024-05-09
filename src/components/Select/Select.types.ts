import { ReactNode } from 'react';
import { GroupBase, OptionProps, Props as ReactSelectProps } from 'react-select';
import { CreatableProps } from 'react-select/creatable';
/**
 * - [Select API](https://lms-react-ui.web.app/?path=/docs/inputs-select--docs)
 */
export type SelectProps = Omit<ReactSelectProps<SelectOption>, 'onChange' | 'value'> &
  Omit<CreatableProps<SelectOption, boolean, SelectGroupOption>, 'onChange' | 'value'> &
  LazyProps & {
    /**
     * Displays an error message below the input field.
     */
    errorMessage?: string;
    /**
     * Renders a label above the input field to provide context.
     */
    label?: ReactNode;

    /**
     * Override the value of the selected option.
     */
    customSelectedOptionValue?: any;

    /**
     * Value of select field.
     */
    value?: any;

    /**
     *
     * @example (name, value) => console.log(values)
     */
    onChange?: (name: any, value: any) => void;

    /**
     * Custom option component to be rendered.
     */
    customOptionComponent?: React.FunctionComponent<any>;

    components?: Omit<ReactSelectProps<SelectOption>['components'], 'Option'>;

    /**
     * onChange return original value option
     * @default false
     */
    keepOptionOnChange?: boolean;

    /**
     * allow create new option while typing
     * @default false
     */
    allowCreateOption?: boolean;

    /**
     * Limit the number of selected options that will be shown in the input.
     * @default 0
     */
    limitSelectedOptions?: number;
  };

export type SelectOption = {
  label: string;
  value: string;
  isDisabled?: boolean;
  subLabel?: string;
  [key: string]: any;
};

export type SelectGroupOption = GroupBase<SelectOption>;

/**
 * Type definition for the `SelectOptions` component.
 */
export type SelectOptionsProps = OptionProps<SelectOption, boolean, SelectGroupOption> &
  LazyProps & {
    /**
     * Custom option component to be rendered.
     */
    customOption?: React.FunctionComponent<any>;
  };

export type LazyProps = {
  /**
   * Custom option to be rendered when lazy loading is enabled.
   */
  allowLazyLoading?: boolean;

  /**
   * Callback to fetch the next page of options.
   * @param (options?: FetchNextPageOptions)
   * @returns Promise<InfiniteQueryObserverResult<PaginationResponseType<TData>, Error>>
   */
  onFetchNextPage?: any;

  /**
   * Determines if there are more options to be fetched.
   */
  hasNextPage?: boolean;

  /**
   * Determines if the component is fetching.
   */
  isFetching?: boolean;
};
