import { Logo } from '@components';
import { PATHS } from '@config/paths';
import { Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { NavbarActions } from './components';

const Navbar = () => {
  const navigate = useNavigate();
  const handleMoveToHome = () => navigate(PATHS.root);

  return (
    <Flex align="center" justify="space-between" h="100%" p="md">
      <Logo onClick={handleMoveToHome} />
      <Navbar.Actions />
    </Flex>
  );
};

Navbar.Actions = NavbarActions;

export default Navbar;
