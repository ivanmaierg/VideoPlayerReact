const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
require('dotenv').config();

const isDev = (process.env.ENV === 'development');
const entry = ['./src/frontend/index.js'];

if (isDev) {
  entry.push('webpack-hot-middleware/client?path=/__webpack_hrm&title');

}
module.exports = {
  entry,
  mode: process.env.ENV,
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: isDev ? 'assets/app.js' : 'assets/app-[hash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@images': path.resolve(__dirname, './src/frontend/assets/static'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: isDev ? 'assets/vendor.js' : 'assets/vendor-[contenthash].js',
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return (chunk) => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name);
          },
        },
      },
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
    isDev ? new ESLintPlugin() : () => { },
    isDev ? new webpack.HotModuleReplacementPlugin() : () => { },
    new MiniCssExtractPlugin({
      filename: isDev ? 'assets/app.css' : 'assets/app-[hash].css',
    }),
    isDev ? () => { } : new WebpackManifestPlugin(),
    //limpia el la carpeta public cuando estamos generando un nuevo build
    isDev ?
      () => { } :
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'src/server/public'),
      }),
  ],
};
