import { ColorCode } from '@core/common';
import { CSSObjectWithLabel, ControlProps, GroupBase, OptionProps, Theme } from 'react-select';
import { SelectOption, SelectProps } from './Select.types';

export type CommonElementState = 'default' | 'warning' | 'error' | 'focus' | 'disabled';

export const getElementState = ({
  isWarning,
  isFocused,
  isDisabled,
  hasError,
}: Partial<{
  isWarning: boolean;
  isFocused: boolean;
  isDisabled: boolean;
  hasError: boolean;
}>): CommonElementState => {
  switch (true) {
    case isDisabled:
      return 'disabled';
    case isWarning:
      return 'warning';
    case hasError:
      return 'error';
    case isFocused:
      return 'focus';
    default:
      return 'default';
  }
};

/**
 * get Option styles
 * @param base base styles of option
 * @param props props of option
 * @param colorCode color code
 * @returns option styles
 */
export const getOptionStyles = (
  base: CSSObjectWithLabel,
  props: OptionProps<SelectOption, boolean, GroupBase<SelectOption>>,
  colorCode: Partial<ColorCode>,
): CSSObjectWithLabel => {
  const { isFocused, isSelected, isDisabled } = props;

  const commonOptionStyles: CSSObjectWithLabel = {
    ...base,
    fontWeight: 500,
    fontSize: '0.875rem',
  };

  if (isDisabled) {
    return {
      ...commonOptionStyles,
      color: isSelected ? colorCode.TEXT_BODY_INVERT : colorCode.TEXT_DISABLED_EMPHASIZED,
      backgroundColor: isSelected ? colorCode.TEXT_DISABLED : colorCode.BG_INPUT_DISABLED,
    };
  }

  if (isFocused) {
    return {
      ...commonOptionStyles,
      color: isSelected ? colorCode.WHITE : colorCode.PRIMARY,
      backgroundColor: isSelected ? colorCode.PRIMARY_500 : colorCode.BG_SURFACE_HOVER,
    };
  }

  if (isSelected) {
    return {
      ...commonOptionStyles,
      color: colorCode.WHITE,
      backgroundColor: colorCode.PRIMARY,
    };
  }

  return {
    ...commonOptionStyles,
    color: colorCode.BLACK,
    backgroundColor: colorCode.WHITE,
  };
};

/**
 * get menu styles
 * @param base
 * @returns menu styles
 */
export const getMenuStyles = (base: CSSObjectWithLabel): CSSObjectWithLabel => {
  return {
    ...base,
    borderRadius: 8,
    boxShadow: '0px 0px 6px 0px #00000026, 0px 5px 24px 0px #34343426',
    overflow: 'hidden',
  };
};

/**
 * get control styles
 * @param base
 * @param props
 * @param colorCode
 * @param isWarning
 * @returns control styles
 */
export const getControlStyles = (
  base: CSSObjectWithLabel,
  props: ControlProps<SelectOption, boolean, GroupBase<SelectOption>>,
  colorCode: Partial<ColorCode>,
  hasError: boolean = false,
  isWarning: boolean = false,
): CSSObjectWithLabel => {
  const { isFocused, isDisabled } = props;

  const customBorderColor = {
    disabled: 'transparent',
    warning: colorCode.WARNING,
    error: colorCode.DANGER,
    focus: colorCode.PRIMARY,
    default: colorCode.GRAY_400,
  };

  return {
    ...base,
    borderRadius: 8,
    borderColor: customBorderColor[getElementState({ isWarning, isFocused, isDisabled, hasError })],
    '&:hover': {
      borderColor: colorCode.PRIMARY,
    },
  };
};

/**
 * get select custom styles
 * @param styles
 * @param colorCode
 * @returns select custom styles
 */
export const getSelectCustomStyles = (
  styles: SelectProps['styles'],
  colorCode: Partial<ColorCode>,
  hasError: boolean = false,
  isWarning: boolean = false,
): SelectProps['styles'] => {
  const {
    option: customOptionStyles,
    menu: customMenuStyles,
    control: customControlStyles,
    singleValue: customSingleValueStyles,
    multiValue: customMultiValueStyles,
    multiValueRemove: customMultiValueRemoveStyles,
    indicatorSeparator: customIndicatorSeparatorStyles,
    indicatorsContainer: customIndicatorsContainerStyles,
    clearIndicator: customClearIndicatorStyles,
    dropdownIndicator: customDropdownIndicatorStyles,
    menuPortal: customMenuPortalStyles,
    ...restCustomStyles
  } = styles || {};

  return {
    option: (
      base: CSSObjectWithLabel,
      props: OptionProps<SelectOption, boolean, GroupBase<SelectOption>>,
    ) => ({
      ...getOptionStyles(base, props, colorCode),
      ...(customOptionStyles && customOptionStyles(base, props)),
    }),
    menu: (base: CSSObjectWithLabel, props: any) => ({
      ...getMenuStyles(base),
      ...(customMenuStyles && customMenuStyles(base, props)),
    }),
    control: (
      base: CSSObjectWithLabel,
      props: ControlProps<SelectOption, boolean, GroupBase<SelectOption>>,
    ) => ({
      ...getControlStyles(base, props, colorCode, hasError, isWarning),
      ...(customControlStyles && customControlStyles(base, props)),
    }),
    singleValue: (base: any, props: any) => ({
      ...base,
      borderBottom: 'none',
      ...(customSingleValueStyles && customSingleValueStyles(base, props)),
    }),
    multiValue: (base: any, props: any) => ({
      ...base,
      backgroundColor: colorCode.BG_INPUT_DISABLED,
      borderRadius: 12,
      paddingLeft: 8,
      paddingRight: 8,

      ':hover': {
        backgroundColor: colorCode.BG_SURFACE_PRESS,
      },
      ...(customMultiValueStyles && customMultiValueStyles(base, props)),
    }),
    multiValueRemove: (base: any, props: any) => ({
      ...base,
      '& svg': { borderRadius: '50%', aspectRatio: 1, width: 16, height: 16 },

      ':hover': {
        '& svg': {
          backgroundColor: colorCode.PRIMARY,
          color: 'white',
          cursor: 'pointer',
        },
      },
      ...(customMultiValueRemoveStyles && customMultiValueRemoveStyles(base, props)),
    }),

    indicatorSeparator: (base: any, props: any) => ({
      ...base,
      backgroundColor: 'transparent',
      ...(customIndicatorSeparatorStyles && customIndicatorSeparatorStyles(base, props)),
    }),
    indicatorsContainer: (base: any, props: any) => ({
      ...base,
      alignSelf: 'flex-start',
      ...(customIndicatorsContainerStyles && customIndicatorsContainerStyles(base, props)),
    }),
    clearIndicator: (base: any, props: any) => ({
      ...base,
      ':hover': {
        '& svg': {
          color: 'black',
          cursor: 'pointer',
        },
      },
      ...(customClearIndicatorStyles && customClearIndicatorStyles(base, props)),
    }),
    dropdownIndicator: (base: any, props: any) => ({
      ...base,
      ':hover': {
        '& svg': {
          color: 'black',
          cursor: 'pointer',
        },
      },
      ...(customDropdownIndicatorStyles && customDropdownIndicatorStyles(base, props)),
    }),
    menuPortal: (base: any, props: any) => ({
      ...base,
      zIndex: 9999,
      ...(customMenuPortalStyles && customMenuPortalStyles(base, props)),
    }),
    ...restCustomStyles,
  };
};

/**
 * get select theme
 * @param theme
 * @param colorCode
 * @param hasError
 * @param isWarning
 * @returns select theme
 */
export const getSelectTheme = (
  theme: Theme,
  colorCode: Partial<ColorCode>,
  hasError: boolean = false,
  isWarning: boolean = false,
): Theme => {
  if (!colorCode) return theme;

  const customNeutral20 = {
    warning: colorCode.WARNING || theme.colors.dangerLight,
    error: colorCode.DANGER || theme.colors.danger,
    default: theme.colors.neutral20,
  };

  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: colorCode.PRIMARY || theme.colors.primary,
      neutral20:
        customNeutral20[getElementState({ isWarning, hasError }) as keyof typeof customNeutral20],
      primary50: colorCode.primary50 || theme.colors.primary50,
    },
  };
};
