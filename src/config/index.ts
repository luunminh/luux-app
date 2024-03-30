import { common as commonConfig } from '@core/common';
import { envConfigs } from './env';

const appConfigs = {
  ...envConfigs,
  ...commonConfig,
};

export default appConfigs;
