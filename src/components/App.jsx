// @flow
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import List from './List'

type Props = {
  client: Object,
}

const App = (props: Props): React$Element<any> => (
  <ApolloProvider client={props.client}>
    <div>
      <h1>Pokemon List Example</h1>
      <List />
    </div>
  </ApolloProvider>
)

export default App
