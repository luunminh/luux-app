import { Logo } from '@components';
import { IMAGES } from '@config/images';
import { LayoutSplit } from '@layout';
import { Box, Stack } from '@mantine/core';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const UAMBody = ({ children }: Props) => {
  return (
    <LayoutSplit bgImage={IMAGES.loginBg} rtl imageWidth="60vw" contentWidth="40vw">
      <Stack
        w="100%"
        align="center"
        justify="center"
        //  p={isTabletScreen && '32px 8px 40px'}
      >
        <Logo
          gap="md"
          imgStyle={{ width: 60, height: 60 }}
          titleStyle={{ fontSize: 60, lineHeight: '54px' }}
        />

        <Box w="100%" maw="480px" px={1}>
          {children}
        </Box>
        <Box flex={1}>&nbsp;</Box>
      </Stack>
    </LayoutSplit>
  );
};

UAMBody.Logo = () => {};

export default UAMBody;
