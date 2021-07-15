module.exports = {
  presets: [
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
    ["@babel/preset-env", { useBuiltIns: "entry", corejs: "3.0.0" }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
  ],
};
