module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true
  },
  extends: "eslint:recommended",
  rules: {
    "no-console": "off",
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "never"]
  }
}
