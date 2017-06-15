// @flow
import React from 'react'
import ReactDOM from 'react-dom'
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

const render = (Component: React$Element<any>) => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Component />
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('react-root'),
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
