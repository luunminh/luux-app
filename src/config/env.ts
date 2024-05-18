export const envConfigs = {
  API_URL: import.meta.env.VITE_API_URL,
  GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
  WEB_URLS: import.meta.env.VITE_WEB_URLS.split(','), // e.g. https://lc.co/identity,https://lc.co/admin
  MODE: import.meta.env.VITE_MODE,
};
