import { themeConfig } from '@config/theme';
import { useComponentDidMount } from '@core/common';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { FC, PropsWithChildren } from 'react';

import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { socketService } from 'src/service';

type Props = PropsWithChildren;

const ThemeProvider: FC<Props> = ({ children }) => {
  useComponentDidMount(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  });

  return (
    <MantineProvider theme={themeConfig}>
      <ModalsProvider
        modalProps={{
          centered: true,
          padding: 24,
          overlayProps: {
            backgroundOpacity: 0.5,
            zIndex: 999999,
            blur: 4,
          },
        }}
      >
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
};

export default ThemeProvider;
