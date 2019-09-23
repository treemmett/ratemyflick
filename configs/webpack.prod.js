const merge = require('webpack-merge');
const path = require('path');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: path.resolve(__dirname, '../dist/web'),
    publicPath: '/'
  },
  devtool: 'source-map'
});
