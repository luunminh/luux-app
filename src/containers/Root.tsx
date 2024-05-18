import { getFullName } from '@core/common';
import { useProfile } from '@core/queries';
import { Button, Stack, Title } from '@mantine/core';

const Root = () => {
  const { profile, getMyProfile } = useProfile();
  console.log('Root ~ profile:', profile);

  return (
    <Stack p={4} w={'100%'} h={'100%'} bg={'green'}>
      <Title mt={16} order={1}>
        {getFullName({ ...profile })}
        <Button onClick={() => getMyProfile()}>Click me</Button>
      </Title>
    </Stack>
  );
};

export default Root;
