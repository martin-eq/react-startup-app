/* eslint-disable flowtype/require-return-type, flowtype/require-parameter-type */
const webpack = require('webpack')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')

module.exports = {

  entry: [
    'react-hot-loader/patch',
    'index.jsx',
  ],

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    modules: [
      'node_modules',
      resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },

  devtool: 'cheap-module-source-map',

  context: __dirname,

  target: 'web',

  devServer: {
    contentBase: resolve(__dirname, 'static'),
    port: 3000,
    compress: true,
    historyApiFallback: true,
    noInfo: false,
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Startup App',
      template: HtmlWebpackTemplate,
      appMountId: 'react-root',
      inject: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'webpack',
      minChunks: Infinity,
    }),
  ],

}
