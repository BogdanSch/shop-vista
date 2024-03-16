"use strict";

const path = require("path");

module.exports = {
  mode: "development", // could be "production" as well
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "dist/assets/scripts"),
    filename: "bundle.js",
  },
  watch: true,
  devtool: "source-map",
  module: {},
};
