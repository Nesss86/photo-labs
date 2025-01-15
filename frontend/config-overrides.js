const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    process: require.resolve("process/browser.js"),
    util: require.resolve("util/"),
    path: require.resolve("path-browserify"),
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
  ]);

  return config;
};






