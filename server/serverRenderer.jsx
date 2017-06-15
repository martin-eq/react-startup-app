// @flow
import React from 'react'
import { renderToString } from 'react-dom/server'
import { AppContainer } from 'react-hot-loader'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'
import App from 'src/components/App'

const networkInterface = createNetworkInterface({
  uri: 'https://todo-mongo-graphql-server.herokuapp.com/graphql',
})

const client = new ApolloClient({
  ssrMode: true,
  networkInterface,
})

export default function serverRenderer(opts: Object): Function {
  const Components = (
    <AppContainer>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AppContainer>
  )

  return (req, res) => {
    const content = renderToString(Components)
    const template = opts.template.replace(new RegExp(`<\\w+ id="${opts.appMountId}">`), `$&${content}`)

    res.status(200).send(template)
  }
}
