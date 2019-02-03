const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ShakePlugin = require('webpack-common-shake').Plugin;
const TerserPlugin = require('terser-webpack-plugin');

const outputDir = path.join(__dirname, 'build/');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/Index.bs.js',
  mode: isProd ? 'production' : 'development',
  output: {
    path: outputDir,
    filename: 'Index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'resources/images/favicon.ico',
    }),
    new ScriptExtHtmlWebpackPlugin({
      preload: {
        test: /\.js$/
      }
    }),
    isProd ? new ShakePlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
          {
            loader: 'responsive-loader',
            options: {
              sizes: [50, 100, 150, 300],
            }
          },
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
    ]
  },
  devtool: isProd ? false : 'eval-source-map',
  devServer: {
    compress: true,
    contentBase: outputDir,
    port: process.env.PORT || 8000,
    historyApiFallback: true
  }
};
