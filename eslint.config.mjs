import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Determine the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a FlatCompat instance
const compat = new FlatCompat({
  baseDirectory: __dirname, // Set the base directory to the current directory
  recommendedConfig: { extends: ["eslint:recommended"] }, // Provide recommended rules
});

// Extend configurations for ESLint
const eslintConfig = [
  ...compat.extends("eslint:recommended"), // Base recommended rules
  ...compat.extends("plugin:react/recommended"), // React-specific rules
  ...compat.extends("plugin:@next/next/recommended"), // Next.js-specific rules
];

// Export the ESLint configuration
export default eslintConfig;
