/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const configs = require('../webpack/webpack.config.dev')

const app = express()
const multiCompiler = webpack(configs)
const clientCompiler = multiCompiler.compilers.find(current => current.name === 'client')
const htmlWebpackPluginOpts =
  clientCompiler.options.plugins
  .find(plugin => plugin.options && plugin.options.appMountId)
const opts = {
  template: '',
  appMountId: htmlWebpackPluginOpts && htmlWebpackPluginOpts.options.appMountId,
}

multiCompiler.plugin('done', () => {
  opts.template = clientCompiler.outputFileSystem.readFileSync(`${clientCompiler.outputPath}/template.html`).toString('utf8')
})

app.use(webpackDevMiddleware(multiCompiler))
// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
app.use(webpackHotMiddleware(clientCompiler))
app.use(webpackHotServerMiddleware(multiCompiler, {
  serverRendererOptions: opts,
}))

app.listen(3000)
