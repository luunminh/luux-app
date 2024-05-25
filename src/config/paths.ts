import { Tenant } from '@core/common';

export const PREFIX_ROUTE = Tenant.APP;

export const PATHS = {
  root: `/${PREFIX_ROUTE}`,
  templates: `/${PREFIX_ROUTE}/templates`,
  settings: `/${PREFIX_ROUTE}/settings`,
  dev: `/${PREFIX_ROUTE}/dev`,
};

// project paths

export const HIDE_NAV_PATHS: string[] = [];

export const HIDE_SIDEBAR_PATHS: string[] = [];

export const NOT_REQUIRED_AUTH_PATHS: string[] = [];
