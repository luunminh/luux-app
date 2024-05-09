/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly VITE_HOST: string;
  readonly VITE_PORT: string;
  readonly VITE_WEB_URLS: string;
  readonly VITE_API_URL: string;
  readonly VITE_COOKIE_DOMAIN: string;
  readonly VITE_GOOGLE_API_KEY: string;
  readonly VITE_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
