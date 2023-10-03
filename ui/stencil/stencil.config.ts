import { Config } from '@stencil/core';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'stencil-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    // {
    //   type: 'www',
    //   serviceWorker: null, // disable service workers
    // },
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
