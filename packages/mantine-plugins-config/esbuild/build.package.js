import { build } from "esbuild";
import { removeDistPlugin } from "./remove-dist.js";

const formats = [
  { name: "esm", extension: {".js": ".mjs"} },
  { name: "cjs", extension: {".js": ".cjs"} },
];

/** @type {import('esbuild').BuildOptions} */
const config = {
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ["esnext"],
  logLevel: "info",
  entryPoints: ["index.ts"],
  plugins: [removeDistPlugin()],
};

/** @param args {import('esbuild').BuildOptions} */
export const buildPackage = async (args) => {
  for (const { name, extension } of formats) {
    await build({
      ...config,
      format: name,
      outExtension: extension,
      outdir: "dist",
      ...args,
    });
  }
};
