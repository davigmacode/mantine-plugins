import { buildPackage } from 'config/esbuild';
import pkg from './package.json' assert { type: 'json' };

buildPackage({
  external: Object.keys(pkg.peerDependencies),
});