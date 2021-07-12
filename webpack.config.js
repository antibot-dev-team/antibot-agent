/* eslint-disable */
const path = require('path');
/* eslint-enable */

module.exports = {
  entry: './src/entrypoint.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'agent.js',
  },
  optimization: {
    minimize: true,
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  // Provide a source map for browsers (debug)
  devtool: 'inline-source-map',
};