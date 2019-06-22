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
      // generate the JS bundle with the target's output filename
      filename: target.output.filename,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              // pass in the specific babel config for each target bundle
              options: target.babelrc
            }
          ],
        }
      ]
    }
  };

  // generate an html file if the target bundle specifies a target html filename
  if (target.output.html) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: target.output.html,
        template: path.resolve(srcPath, 'index.html'),
        inject: 'body',
        // template variable that adds the <script type="module" /> with the provided value
        esmodules: target.output.esmodules
      })
    );
  }

  // add a nomodule attribute to the default JS script tag
  if (target.output.esmodules) {
    config.plugins.push(
      new ScriptExtHtmlWebpackPlugin({
        custom: {
          test: target.output.filename,
          attribute: 'nomodule'
        }
      })
    );
  }

  return merge(webpackBaseConfig, config);
});

module.exports = bundles;
