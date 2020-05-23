import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'builtin-modules';
import pkg from './package.json';

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs', // Common JS (Node)
    },
    {
      file: pkg.module,
      format: 'es', // ES6 import/export
    },
  ],
  plugins: [resolve(), commonjs(), json()],
  external: builtins,
};
