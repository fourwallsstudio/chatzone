const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './frontend/chatzone.jsx', './scss/main.scss'],
  output: {
    path: path.resolve(__dirname, 'chatzone', 'static', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*'],
    alias: {
      components: path.resolve(__dirname, 'frontend/components'),
      scss: path.resolve(__dirname, 'scss/'),
      reducers: path.resolve(__dirname, 'frontend/reducers'),
      sagas: path.resolve(__dirname, 'frontend/sagas')
    },
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties', 'transform-regenerator'],
        },
      }, {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'frontend'), path.resolve(__dirname, 'scss'),
        ],
        loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('main.css', {
      allChunks: true,
    })
  ],
};
