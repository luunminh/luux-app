import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {};

const ThemeProvider: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default ThemeProvider;
