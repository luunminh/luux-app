import { IMAGES } from '@config/images';
import { Flex, FlexProps, Image, ImageProps, Title, TitleProps } from '@mantine/core';

import { Callback } from '@core/common';
import './logo.styles.scss';

type Props = {
  onClick?: Callback;
  gap?: FlexProps['gap'];
  imgStyle?: ImageProps['style'];
  titleStyle?: TitleProps['style'];
};

const Logo = ({ onClick, titleStyle, gap = 'xs', imgStyle = { height: 40, width: 40 } }: Props) => {
  return (
    <Flex
      gap={gap}
      h="100%"
      onClick={onClick}
      style={
        onClick && {
          cursor: 'pointer',
          alignItems: 'center',
        }
      }
      className="cmp-logo"
    >
      <Image
        src={IMAGES.logo}
        alt="Logo"
        style={{
          objectFit: 'contain',
          ...imgStyle,
        }}
      />
      <Title
        order={2}
        style={{
          fontFamily: 'monospace',
          ...titleStyle,
        }}
        className="cmp-logo__title"
      >
        LUUX
      </Title>
    </Flex>
  );
};

export default Logo;
