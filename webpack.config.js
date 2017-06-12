/* eslint-disable flowtype/require-return-type, flowtype/require-parameter-type */
const webpack = require('webpack')
const path = require('path')

const clientConfig = {

  name: 'client',

  target: 'web',

  entry: {
    client: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      'clientRenderer.jsx',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
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
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },

  devtool: 'cheap-module-source-map',

  context: __dirname,

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'webpack',
      minChunks: Infinity,
    }),
  ],

}

const serverConfig = {

  name: 'server',

  target: 'node',

  entry: 'serverRenderer.jsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
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
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },

  devtool: 'cheap-module-source-map',

  context: __dirname,

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],

}

module.exports = [
  clientConfig,
  serverConfig,
]
