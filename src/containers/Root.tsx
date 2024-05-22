import { UnderConstruction } from '@core/components';
import { useProfile } from '@core/queries';
import { Stack } from '@mantine/core';

const Root = () => {
  const { profile, getMyProfile } = useProfile();
  console.log('Root ~ profile:', profile);

  return (
    <Stack p={4} w={'100%'} h={'100%'}>
      {/* <Title mt={16} order={1}>
        {getFullName({ ...profile })}
        <Button onClick={() => getMyProfile()}>Click me</Button>
      </Title> */}
      <UnderConstruction />
    </Stack>
  );
};

export default Root;
