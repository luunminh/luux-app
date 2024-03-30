import { IMAGES } from '@config/images';
import { PATHS } from '@config/paths';
import { Flex, Image, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import './logo.styles.scss';

const Logo = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate(PATHS.root);
    alert('Navigate to home');
  };

  return (
    <Flex
      gap="xs"
      h="100%"
      onClick={handleNavigateToHome}
      style={{
        cursor: 'pointer',
        alignItems: 'center',
      }}
      className="cmp-logo"
    >
      <Image
        src={IMAGES.logo}
        alt="Logo"
        style={{
          objectFit: 'contain',
          width: 40,
          height: 40,
        }}
      />
      <Title
        order={2}
        style={{
          fontFamily: 'Courier New, monospace',
        }}
        className="cmp-logo__title"
      >
        LUUX
      </Title>
    </Flex>
  );
};

export default Logo;
