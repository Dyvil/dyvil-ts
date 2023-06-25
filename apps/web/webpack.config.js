const {merge} = require('webpack-merge');
const {resolve} = require('path');
const {ProvidePlugin} = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader?{"url":false}'],
        },
        {
          test: /\.(ttf|mp3|wasm)$/,
          type: 'asset/resource'
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        path: resolve(__dirname, '../../node_modules/path-browserify'),
      },
    },
    plugins: [
      new ProvidePlugin({
        process: 'process/browser',
      }),
      new MonacoWebpackPlugin({
        publicPath: '/',
        languages: ['typescript', 'javascript'],
      }),
    ],
  });
};
