var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
  context: __dirname + '/src',
  entry: [
      'webpack-hot-middleware/client?reload=true&path=http://localhost:8080/__webpack_hmr',
      './index.js'
  ],

  output: {
    filename: 'index_bundle.js',
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8080/dist/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },

  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
