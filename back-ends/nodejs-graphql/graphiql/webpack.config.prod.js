/* eslint no-var: 0 */
var path = require('path');
var webpack = require('webpack');

// In webpack.config.js
module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src', 'app.js'),
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      '__DEVTOOLS__': false,
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  output: {filename: 'graphiql.js', path: path.join(__dirname,'build')},
};
