const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/frontend/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000$reload=true'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/app.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@images': path.resolve(__dirname, '/src/frontend/assets/images'),
    },
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
      },
    },
    {
      test: /\.(s*)css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
      'sass-loader',
      ],
    },
    {
      test: /\.(png|gif|jpg|webp|mp4)$/,
      use: [{
        'loader': 'file-loader',
        options: {
          name: 'assets/[hash].[ext]',
        },
      }],
    },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
