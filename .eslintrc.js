module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "env": {
      "browser": true,
      "es2021": true
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/no-explicit-any": "off"
  }
}
