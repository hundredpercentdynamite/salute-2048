const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { author, description } = require('../package.json');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          // The `injectType`  option can be avoided because it is default behaviour
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './public/images/favicon.svg',
      favicons: {
        appName: 'Salute 2048',
        appShortName: '2048',
        developerName: author,
        appDescription: description,
        background: 'white',
        theme_color: 'white',
        display: 'fullscreen',
        orientation: 'portrait',
        start_url: '../index.html',
        icons: {
          android: true,
          appleIcon: true,
          favicons: true,
          windows: true,
          appleStartup: false,
          coast: false,
          firefox: false,
          yandex: false,
        },
      },
    }),
  ],
};
