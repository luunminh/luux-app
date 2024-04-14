import { Stack } from '@mantine/core';

const Root = () => {
  console.log('Root');
  return (
    <Stack p={4} w={'100%'} h={'100%'} bg={'green'}>
      Root
    </Stack>
  );
};

export default Root;
