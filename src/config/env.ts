const isLocal = import.meta.env.VITE_DEPLOYMENT_ENV === 'development';

export const envConfigs = {
  API_URL: isLocal ? import.meta.env.VITE_API_URL : import.meta.env.VITE_LOCAL_API_URL,
};
