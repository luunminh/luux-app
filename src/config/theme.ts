import { COLOR_CODE } from '@core/common';
import { Button, InputLabel, MenuItem, PasswordInput, TextInput, createTheme } from '@mantine/core';

export const themeConfig = createTheme({
  fontFamily: 'Arial',
  fontFamilyMonospace: 'Arial',
  headings: { fontFamily: 'Arial' },

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

    MenuItem: MenuItem.extend({
      defaultProps: {
        color: COLOR_CODE.TEXT_BODY,
      },
    }),

    InputLabel: InputLabel.extend({
      defaultProps: {
        style: {
          fontFamily: 'Roboto',
          fontWeight: 500,
        },
      },
    }),
  },
});
