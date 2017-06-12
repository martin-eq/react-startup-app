/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { AppContainer } from 'react-hot-loader'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'
import App from './components/App'

const networkInterface = createNetworkInterface({
  uri: 'https://todo-mongo-graphql-server.herokuapp.com/graphql',
})

const client = new ApolloClient({
  networkInterface,
})

export default function serverRenderer(opts) {
  const Components = (
    <AppContainer>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AppContainer>
  )

  const template = `
      <!doctype html>
      <html>
      <head>
          <title>React Startup App</title>
      </head>
      <body>
          <div id="react-root">${renderToString(Components)}</div>
          <script src="/webpack.js"></script>
          <script src="/vendor.js"></script>
          <script src="/client.js"></script>
      </body>
      </html>
  `

  return (req, res) => {
    res.status(200).send(template)
  }
}
