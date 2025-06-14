// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "node_modules/*"],
    rules: {
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
    },
  },
]);
