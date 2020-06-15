import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

// The list of dependencies to load from node_modules rather than bundle directly into phasetwo-nodejs bundle
// In practice this list should always match the list of dependencies in package.json
const externals = ['keycloak-connect', 'phasetwo-api-client'];

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
  plugins: [
    // locates modules using the Node resolution algorithm, for using third party modules in node_modules
    resolve(),

    // converts CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs(),

    // converts .json files to ES6 modules
    json(),

    // shows filesize in console after building Rollup bundle
    filesize(),
  ],
  external: externals,
};
