const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.tsx'
  ],
  devServer: {
    hot: true
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
