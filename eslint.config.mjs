import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import path from "path";
import { fileURLToPath } from "url";

// Mimic __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 1. Add Airbnb compatibility
  ...fixupConfigRules(compat.extends("airbnb")),
  // 2. Add Airbnb TypeScript support (if needed)
  ...fixupConfigRules(compat.extends("airbnb-typescript/base")),

  {
    rules: {
      // Your custom alphabetizing rule from before
      "react/jsx-sort-props": ["error", { "ignoreCase": true, "reservedFirst": true }],
      // Common Airbnb overrides for Next.js
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
