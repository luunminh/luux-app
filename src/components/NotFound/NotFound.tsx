import { PATHS } from '@config/paths';
import { COLOR_CODE, usePathname } from '@core/common';
import { Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { pathname } = usePathname();

  return (
    <Stack
      my={8}
      style={{
        textAlign: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Title
        order={1}
        c={COLOR_CODE.DANGER}
        style={{
          fontSize: 96,
        }}
      >
        404
      </Title>

      <Title order={3} py={4} fw="bold" c={COLOR_CODE.GRAY_600}>
        Oops! The requested URL: <span>{pathname}</span> was not found on this server.
      </Title>

      <Title order={5} my={4} fw="bold" c={COLOR_CODE.GRAY_600}>
        Otherwise,{' '}
        <Link
          style={{
            color: COLOR_CODE.PRIMARY,
            textDecoration: 'none',
          }}
          to={PATHS.root}
        >
          click here
        </Link>{' '}
        to be redirected to the homepage.
      </Title>
    </Stack>
  );
};

export default NotFound;
