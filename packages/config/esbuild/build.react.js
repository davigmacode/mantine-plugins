import { buildSync } from 'esbuild';

export const buildReact = ({ ...args }) => buildSync({
  entryPoints: ['./src/index.tsx'],
  platform: 'browser',
  target: 'es6',
  format: 'iife',
  jsx: 'automatic',
  bundle: true,
  outfile: './dist/index.js',
  sourcemap: false,
  logLevel: 'info',
  ...args,
});
