import { defineConfig } from "tsdown";

/**
 * Shared build configuration for `tsdown`.
 */
export default defineConfig({
    // Entrypoints and outputs
    entry: {
        index: "src/index.ts",
        "react/index": "./src/react/index.ts",
    },
    format: ["esm", "cjs"],
    fixedExtension: true,
    dts: true,

    // Targets / platforms
    platform: "browser", // "node" | "browser" | "neutral"
    target: ["es2020"],
    // allows resolving via your tsconfig paths, e.g. "src/*"
    tsconfig: "tsconfig.json",

    // Output hygiene & performance
    outDir: "dist",
    clean: true,
    sourcemap: false, // don't publish prod sourcemaps
    minify: true, // let Terser handle all minify + mangle
    treeshake: true,

    // Compile-time defines
    define: { "process.env.NODE_ENV": "'production'" },

    // Don't bundle peer deps; keep React external so consumers don't get duplicates
    external: ["react", "react-dom"],

    // File loaders for non-code assets
    loader: {
        ".png": "base64",
        ".json": "json",
    },

    // Pass-through Rolldown options
    inputOptions: {
        // keepNames: true, // preserve function/class names (safer for stack traces & React)
        keepNames: false, // allow full name mangling in prod

        resolve: {
            // resolves extensionless imports or mismatched extensions
            extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"],
            extensionAlias: {
                ".js": [".ts", ".tsx", ".js"],
                ".mjs": [".mts", ".mjs"],
                ".cjs": [".cts", ".cjs"],
            },
        },
    },
    outputOptions: {
        // Mimic tsup - esbuild "splitting: false"
        inlineDynamicImports: true,
    },

    // Use fixed extensions per format
    // Just maps from tsdown internal names to output file extensions.
    outExtensions(ctx) {
        if (ctx.format === "es") return { js: ".mjs" };
        if (ctx.format === "cjs") return { js: ".cjs" };
        return { js: ".js" };
    },
});
