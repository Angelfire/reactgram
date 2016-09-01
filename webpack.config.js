'use strict';

const webpack = require('webpack');
const webpackPort = '3000';

module.exports = {
  entry: {
    bundle: [
      `webpack-dev-server/client?http://localhost:${webpackPort}`,
      'webpack/hot/only-dev-server',
      './js/script.js'
    ]
  },
  output: {
    path: __dirname + '/dist/',
    publicPath: '/dist/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    hot: true,
    inline: true,
    stats: 'errors-only',
    port: webpackPort,
    host: 'localhost'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
