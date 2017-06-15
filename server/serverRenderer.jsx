// @flow
import React from 'react'
import { renderToString } from 'react-dom/server'
import ApolloClient from 'src/apollo/client'
import App from 'src/components/App'

export default function serverRenderer(opts: Object): Function {
  return (req, res) => {
    const content = renderToString(<App client={ApolloClient} />)
    const template = opts.template.replace(new RegExp(`<\\w+ id="${opts.appMountId}">`), `$&${content}`)

    res.status(200).send(template)
  }
}
