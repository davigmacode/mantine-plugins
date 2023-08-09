import { buildPackage } from 'mantine-plugins-config/esbuild';
import pkg from './package.json' assert { type: 'json' };

buildPackage({
  entryPoints: ['index.ts'],
  external: Object.keys(pkg.peerDependencies),
});