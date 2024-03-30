import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

type Props = PropsWithChildren;

const RouterProvider = ({ children }: Props) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
