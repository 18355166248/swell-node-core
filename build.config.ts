import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: ["src/index", "src/bin", "src/utils/platform.ts"],
  clean: true,
  // Change outDir, default is 'dist'
  outDir: "bin",
  // Generates .d.ts declaration file
  declaration: true,
  rollup: {
    // emitCJS: true,
    // cjsBridge: true,
    esbuild: {
      // minify: true,
    },
  },
});
