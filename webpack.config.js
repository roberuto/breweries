const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const envVariables = require('./scripts/env');

const envs = envVariables(process.env.WEBPACK_DEV_SERVER);

module.exports = () => {
  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: process.env.WEBPACK_DEV_SERVER ? 'static/js/bundle.js' : 'static/js/[name].[contenthash:8].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        esmodules: true,
                      },
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /(?<!\.style).css$/,
          use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.style\.css$/,
          use: ['css-loader'],
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      clientLogLevel: 'silent',
      quiet: true,
      hot: true,
      open: true,
      contentBase: path.resolve(process.cwd(), 'public'),
      contentBasePublicPath: '/',
    },
    plugins: [
      new DefinePlugin({
        'process.env': JSON.stringify(envs),
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: 'public/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
      }),
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
    ],
  };
};
