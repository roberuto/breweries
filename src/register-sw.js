import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import { DEBUG, isProduction } from './config';

export const registerSW = () => {
  if (isProduction() || DEBUG) {
    runtime.register();
  }
};
