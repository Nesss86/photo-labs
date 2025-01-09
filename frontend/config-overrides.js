const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    util: require.resolve("util/"),
    path: require.resolve("path-browserify"),
    process: require.resolve("process/browser"),
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ]);

  config.ignoreWarnings = [
    {
      module: /sass\.dart\.js$/, // Suppress warnings for sass.dart.js
    },
  ];

  return config;
};







