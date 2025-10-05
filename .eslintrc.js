module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["next/core-web-vitals", "airbnb", "airbnb-typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  ignorePatterns: [".eslintrc.js"],
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // React specific rules
    "react/react-in-jsx-scope": "off", // Not needed in Next.js
    "react/prop-types": "off", // We use TypeScript for prop validation
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],

    // Import rules
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.spec.ts",
          "**/*.spec.tsx",
          "**/test/**/*",
          "**/tests/**/*",
          "**/__tests__/**/*",
          "**/eslint.config.*",
          "**/eslint.config.*.js",
          "**/eslint.config.*.mjs",
          "**/.eslintrc.*",
          "**/next.config.*",
          "**/tailwind.config.*",
          "**/postcss.config.*",
        ],
      },
    ],

    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/indent": "off",

    // General rules
    "no-console": "warn",
    "no-debugger": "error",
    "prefer-const": "error",
    "no-var": "error",
    quotes: "off",
    "comma-dangle": "off",
    indent: "off",
    "object-curly-newline": "off",
    "implicit-arrow-linebreak": "off",
    "operator-linebreak": "off",
    "nonblock-statement-body-position": "off",
    curly: "off",
    "prefer-destructuring": "off",
    "react/no-array-index-key": "off",
    "no-nested-ternary": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/naming-convention": "off",
    "arrow-body-style": "off",
    "react/jsx-one-expression-per-line": "off",

    // Next.js specific
    "@next/next/no-img-element": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
