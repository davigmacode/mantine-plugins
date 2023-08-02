import { buildSync } from 'esbuild';
import fg from 'fast-glob';
import { removeDistPlugin } from './remove-dist.js';

export const buildNode = ({ ...args }) => buildSync({
  entryPoints: fg.globSync('src/**/*.ts'),
  platform: 'node',
  target: 'node16',
  format: 'esm',
  bundle: false,
  outdir: './dist',
  sourcemap: false,
  logLevel: 'info',
  plugins: [removeDistPlugin()],
  ...args
});
