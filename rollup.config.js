import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/Token.js',
    name: 'TokenJS',
    format: 'iife',
  },
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
