const path = require('path');
const webpack = require('webpack');

const srcPath = path.join(__dirname, '..', 'scripts');

module.exports = {
  entry: path.join(srcPath, 'index'),
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV
    })
  ],
  resolve: {
    alias: {
      app: path.resolve(srcPath, 'app')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  optimization: {
    namedModules: true,
    concatenateModules: true,
    splitChunks: {
      name: 'vendor',
      minChunks: 2
    },
    minimize: false
  }
};
