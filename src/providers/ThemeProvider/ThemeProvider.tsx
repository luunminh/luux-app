import { themeConfig } from '@config/theme';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { FC, PropsWithChildren } from 'react';

import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

type Props = PropsWithChildren;

const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={themeConfig}>
      <ModalsProvider
        modalProps={{
          centered: true,
          padding: 24,
        }}
      >
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
};

export default ThemeProvider;
