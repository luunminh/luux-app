import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {};

const ThemeProvider: FC<Props> = ({ children }) => {
  return <div>hi</div>;
};

export default ThemeProvider;
