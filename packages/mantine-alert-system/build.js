import { buildPackage } from 'mantine-plugins-config/esbuild';
import pkg from './package.json' assert { type: 'json' };

buildPackage({
  external: Object.keys(pkg.peerDependencies),
});