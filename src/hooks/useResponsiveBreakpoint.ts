import { MantineBreakpoint, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const useResponsiveBreakpoint = (bp: MantineBreakpoint) => {
  const { breakpoints } = useMantineTheme();

  const mediaQuery = `@media (max-width: ${breakpoints[bp]})`;
  const isResponsiveSize = useMediaQuery(`(max-width: ${breakpoints[bp]})`);

  return { mediaQuery, isResponsiveSize };
};

export default useResponsiveBreakpoint;
