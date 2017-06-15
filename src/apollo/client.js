import {
  ApolloClient,
  createNetworkInterface,
} from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'https://pokeapi-graphiql.herokuapp.com/',
})

const client = new ApolloClient({
  networkInterface,
})

export default client
