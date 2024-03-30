import { COLOR_CODE } from '@core/common';
import { Loader, Overlay } from '@mantine/core';
import { FC } from 'react';

const LoadingContainer: FC = () => (
  <Overlay
    zIndex={9999}
    display="flex"
    style={{
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Loader color={COLOR_CODE.WHITE} size="xl" />
  </Overlay>
);

export default LoadingContainer;
