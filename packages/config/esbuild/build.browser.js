import { buildSync } from 'esbuild';
import fg from 'fast-glob';

export const buildBrowser = ({ entryPoints = 'src/**/*.ts', ...args }) => buildSync({
  entryPoints: fg.globSync(entryPoints),
  platform: 'browser',
  target: 'es6',
  format: 'iife',
  bundle: true,
  outdir: './dist',
  sourcemap: false,
  logLevel: 'info',
  ...args,
});
