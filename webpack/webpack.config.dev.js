/* eslint-disable flowtype/require-return-type, flowtype/require-parameter-type */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')
const SimpleProgressPlugin = require('webpack-simple-progress-plugin')
const nodeExternals = require('webpack-node-externals')

const moduleConfig = {
  rules: [
    {
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
  ],
}

const resolveConfig = {
  modules: [
    'node_modules',
    path.resolve(__dirname, '..', 'src'),
  ],
  extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
}

const contextConfig = path.resolve(__dirname, '..')

const clientConfig = {

  name: 'client',

  target: 'web',

  entry: {
    client: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './src/clientEntry.jsx',
    ],
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
  },

  devtool: 'cheap-module-source-map',

  module: moduleConfig,

  resolve: resolveConfig,

  context: contextConfig,

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new SimpleProgressPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Startup App',
      template: HtmlWebpackTemplate,
      filename: 'template.html',
      appMountId: 'react-root',
      inject: false,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function minChunks(mod) {
        return mod.context && mod.context.indexOf('node_modules') !== -1
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

  entry: './server/serverEntry.jsx',

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  devtool: 'cheap-module-inline-source-map',

  module: moduleConfig,

  resolve: resolveConfig,

  context: contextConfig,

  externals: [nodeExternals()],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true,
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],

}

module.exports = [
  clientConfig,
  serverConfig,
]
