var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',

  output: {
    filename: 'index_bundle.js',
    path: __dirname + '/dist',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
