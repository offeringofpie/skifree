const path = require('path');
const webpack = require('webpack');
const NotifierPlugin = require('webpack-notifier');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  return {
    mode: 'development',
    entry: ['./src/main.js'],
    output: {
      filename: 'dist/script.min.js',
      path: path.resolve(__dirname, 'docs')
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
        },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        },
        {
          test: /\.(?:png|jpg|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new NotifierPlugin({
        title: 'Skifree',
        contentImage: path.join(__dirname, 'docs/img/logo.png'),
        alwaysNotify: true,
        skipFirstNotification: true
      }),
      new HtmlWebpackPlugin({
        template: __dirname + '/src/index.template.ejs',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename: 'dist/css/style.min.css'
      }),
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
    performance: { hints: false },
    serve: {
      contentBase: path.join(__dirname, 'docs'),
      compress: true,
      host: '0.0.0.0',
      port: 4000,
      hot: {
        logLevel: 'info',
        logTime: true
      }
    },
    node: {
      setImmediate: false,
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  };
};
