// @flow
import React from 'react'
import { renderToString } from 'react-dom/server'
import ApolloClient from 'apollo/client'
import App from 'components/App'

export default function serverRenderer(opts: Object): Function {
  return (req: Object, res: Object) => {
    const content = renderToString(<App client={ApolloClient} />)
    const template = opts.template.replace(new RegExp(`<\\w+ id="${opts.appMountId}">`), `$&${content}`)

    res.status(200).send(template)
  }
}
