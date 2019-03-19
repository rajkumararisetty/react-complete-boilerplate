const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Add this in top

const APP_DIR = path.resolve(__dirname, '../src'); // <===== new stuff added here

module.exports = env => {
  const {PLATFORM, VERSION} = env;
  return merge(
    [
      {
        entry: ['@babel/polyfill', APP_DIR], // <===== new stuff added here
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            },
            {
              test: /\.scss$/,
              use: [
                PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'sass-loader'
              ]
            }
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
          }),
          new webpack.DefinePlugin({
            'process.env.VERSION': JSON.stringify(VERSION),
            'process.env.PLATFORM': JSON.stringify(PLATFORM)
          }),
          new CopyWebpackPlugin([ { from: 'src/static' } ]), // Add this in the plugins section
        ],
        devServer: {
          host: '127.0.0.1',
        }
      }
    ]
  )
};