import { Config } from '@stencil/core';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import {} from './src/global/app.css';

export const config: Config = {
  namespace: 'stencil-components',
  globalScript: 'src/global/app.ts',
  globalStyle: './src/global/app.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
  rollupPlugins: {
    before: [
      nodeResolve({
        browser: true,
        preferBuiltins: false,
      }),
    ],
    after: [nodePolyfills()],
  },
};
