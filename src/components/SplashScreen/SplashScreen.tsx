import { IMAGES } from '@config/images';
import { Box, Image, Overlay } from '@mantine/core';
import { FC } from 'react';

import './SplashScreen.styles.scss';

type Props = {};

const SplashScreen: FC<Props> = () => (
  <Overlay
    zIndex={9999}
    display="flex"
    style={{
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box>
      <Image src={IMAGES.logo} className="cmp-splash-screen__image" />
    </Box>
  </Overlay>
);

export default SplashScreen;
