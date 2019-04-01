const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ShakePlugin = require('webpack-common-shake').Plugin;
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outputDir = path.join(__dirname, 'build/');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/Index.bs.js',
  mode: isProd ? 'production' : 'development',
  output: {
    path: outputDir,
    filename: '[name].[hash].js',
  },
  plugins: [
    isProd ? null : new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([{ from: '_redirects', to: outputDir }, { from: 'src/netlify.html', to: outputDir }]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'resources/images/favicon.ico',
    }),
    new PreloadWebpackPlugin({
      include: 'allAssets',
      fileBlacklist: [/\.png/],
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.(woff|woff2|eot|otf)$/.test(entry)) return 'font';
        if (/\.(png|jpg|gif|ico)$/.test(entry)) return 'image';
        return 'script';
      }
    }),
    new ImageMinPlugin(({
      test: /\.(png|jpg|gif)$/,
      disable: !isProd,
      pngquant: {
        quality: '95-100'
      }
    })),
    isProd ? new ShakePlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all'
    }
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
              sizes: [100, 300, 500],
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
    hot: true,
    contentBase: outputDir,
    port: process.env.PORT || 8000,
    historyApiFallback: true
  }
};
