const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      favicon: 'images/favicon.ico',
      inject: false
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
        test: /\.(png|jpg|gif)$/i,
        loader: 'url-loader',
      }
    ]
  },
  devServer: {
    compress: true,
    contentBase: outputDir,
    port: process.env.PORT || 8000,
    historyApiFallback: true
  }
};
