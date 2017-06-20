// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import ApolloClient from 'apollo/client'
import App from 'components/App'
// eslint-disable-next-line import/no-extraneous-dependencies
import type { FunctionalComponent } from 'react-flow-types'

const render = (Component: FunctionalComponent<{ client: ApolloClient }>) => {
  ReactDOM.render(
    <AppContainer>
      <Component client={ApolloClient} />
    </AppContainer>,
    document.getElementById('react-root'),
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
