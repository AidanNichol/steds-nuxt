module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint"
  },
  env: {
    browser: true,
    node: true,
    "es6": true,
    "jest": true,
  },
  extends: ["prettier", "prettier/standard", "plugin:vue/essential"],
  plugins: ["vue", "prettier"],
  rules: {
    // "prettier/prettier": "error",
    "vue/singleline-html-element-content-newline": 0,
    "vue/max-attributes-per-line": 0,
    "vue/attributes-order": 0,
    "vue/mustache-interpolation-spacing": 0,
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    semi: 0,
    'arrow-spacing': 0,
    // 'comma-dangle': 1,
    'eol-last': 0,
    'space-before-function-paren': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "quotes": [0, "single"],
    "no-mixed-requires": [0],
    "no-underscore-dangle": [0],
    "semi-spacing": [0],
    "no-console": [0],
    "curly": [0],
    "new-cap": [0],
    "comma-dangle": [0],
    strict: 2,
  },
  globals: {},

};
