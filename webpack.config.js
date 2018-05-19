const path = require('path');
const webpack = require('webpack');
const NotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/main.js'],
  output: {
    filename: 'dist/script.min.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        })
      }, {
        test: /\.(?:png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          name: "img/[name].[ext]",
        },
      }
    ]
  },
  plugins: [
    new NotifierPlugin({
      title: 'Skifree',
      contentImage: path.join(__dirname, 'build/img/logo.png'),
      alwaysNotify: true,
      skipFirstNotification: true
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.template.ejs',
      inject: 'body'
    }),
    new ExtractTextPlugin('dist/style.min.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        },
        discardEmpty: true,
        discardOverridden: true
      }
    })
  ],
  performance: { hints: false }
};
