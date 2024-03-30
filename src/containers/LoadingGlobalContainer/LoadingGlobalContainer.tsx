import { LoadingContainer } from '@components';
import { useCommonStore } from '@core/store';
import { FC } from 'react';

const LoadingGlobalContainer: FC = () => {
  const { showLoadingGlobal } = useCommonStore();

  if (!showLoadingGlobal) return null;

  return <LoadingContainer />;
};

export default LoadingGlobalContainer;
