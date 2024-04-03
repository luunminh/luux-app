import { COLOR_CODE } from '@core/common';
import { Button, PasswordInput, TextInput, createTheme } from '@mantine/core';

export const themeConfig = createTheme({
  fontFamily: 'Public Sans, sans-serif',
  fontFamilyMonospace: 'Public Sans, sans-serif',
  headings: { fontFamily: 'Public Sans, sans-serif' },

  defaultRadius: 'md',

  colors: {
    gray: [
      COLOR_CODE.GRAY_00,
      COLOR_CODE.GRAY_100,
      COLOR_CODE.GRAY_200,
      COLOR_CODE.GRAY_300,
      COLOR_CODE.GRAY_400,
      COLOR_CODE.GRAY_500,
      COLOR_CODE.GRAY_600,
      COLOR_CODE.GRAY_700,
      COLOR_CODE.GRAY_800,
      COLOR_CODE.GRAY_900,
    ],
  },

  components: {
    Button: Button.extend({
      defaultProps: {
        size: 'md',
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        size: 'md',
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        size: 'md',
        errorProps: {
          size: 'md',
        },
      },
    }),
  },
});
