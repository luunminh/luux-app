import { Flex } from '@mantine/core';
import { Logo, NavbarActions } from './components';

const Navbar = () => {
  return (
    <Flex align="center" justify="space-between" h="100%" p="md">
      <Navbar.Logo />
      <Navbar.Actions />
    </Flex>
  );
};

Navbar.Logo = Logo;
Navbar.Actions = NavbarActions;

export default Navbar;
