// @ts-check
// ESLint v9 flat config
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";

export default tseslint.config(
    // Ignore generated/third-party outputs
    { ignores: ["dist/**", "node_modules/**", "**/*.d.ts"] },

    // Base JS + TypeScript (NO type info by default — fast & safe)
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // Prettier compatibility (turn off formatting-conflict rules)
    prettier,

    // Browser globals for app code & demo HTML builds
    {
        files: ["src/**/*.{ts,tsx,js,jsx}", "dev/**/*.{js,jsx}"],
        languageOptions: { globals: globals.browser },
    },

    // Node globals for config/tests/tooling (no typed rules here)
    {
        files: [
            "vite.config.*",
            "tsup.config.*",
            "tsdown.config.*",
            "playwright.config.*",
            "eslint.config.*",
            // "scripts/**/*.{ts,js}",
            "dev/**/vite.config.*",
            "playwright.config.*",
            "*.config.*",
        ],
        languageOptions: { globals: globals.node, sourceType: "module" },
        extends: [tseslint.configs.disableTypeChecked],
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },

    // React + Hooks + your requested TS rules (no type info required)
    {
        files: ["**/*.{ts,tsx}"],
        plugins: { react, "react-hooks": reactHooks },
        settings: { react: { version: "detect" } },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },

    // Temporarily relax strict rules in dynamic code (prototype-heavy)
    {
        files: ["src/**/*.{ts,tsx,js}"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "no-unused-vars": "off",
        },
    },
    // Dev/demo apps: don't block on strict typing or unuseds
    {
        files: ["dev/**/*.{ts,tsx,js,jsx}"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "no-unused-vars": "off",
        },
    },
    // Tests: allow flexible types and unused helpers/fixtures
    {
        files: ["test/**/*.{ts,tsx,js,jsx}"],
        languageOptions: { globals: globals.node },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "no-unused-vars": "off",
        },
    },
);
