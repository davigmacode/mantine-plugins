import { build } from 'esbuild';
import { removeDistPlugin } from './remove-dist.js';

const formats = [
  { name: 'esm', extension: 'mjs' },
  { name: 'cjs', extension: 'cjs' },
];

/** @type {import('esbuild').BuildOptions} */
const config = {
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['esnext'],
  logLevel: 'info',
  entryPoints: ['index.ts'],
  plugins: [removeDistPlugin()],
};

/** @param args {import('esbuild').BuildOptions} */
export const buildPackage = async (args) => {
  for (const { name, extension } of formats) {
    await build({ ...config, format: name, outfile: `./dist/index.${extension}`, ...args });
  }
};