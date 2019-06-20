const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpackBaseConfig = require('./webpack.config');

const srcPath = path.join(__dirname, '..', 'scripts');

const TARGETS = [
  require(path.join(__dirname, 'targets', 'esmodules.target')),
  require(path.join(__dirname, 'targets', 'modern.target')),
  require(path.join(__dirname, 'targets', 'legacy.target'))
];

const bundles = TARGETS.map(target => {
  const config = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new webpack.HashedModuleIdsPlugin()
    ],
    output: {
      filename: target.filename,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: target.options
            }
          ],
        }
      ]
    }
  };

  if (target.html) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: target.html,
        template: path.resolve(srcPath, 'index.html'),
        inject: 'body',
        esmodules: target.esmodules
      })
    );
  }

  if (target.esmodules) {
    config.plugins.push(
      new ScriptExtHtmlWebpackPlugin({
        custom: {
          test: target.filename,
          attribute: 'nomodule'
        }
      })
    );
  }

  return merge(webpackBaseConfig, config);
});

module.exports = bundles;
