// @flow
import React from 'react'
import { gql, graphql } from 'react-apollo'

const MyQuery = gql`
  {
    pokedex {
      pokemon(start: 0, number: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`

type Edge = {
  node: {
    id: string,
    name: string,
  },
}

type Props = {
  data: {
    loading: boolean,
    pokedex: {
      pokemon: {
        edges: Array<Edge>,
      },
    },
    error: any,
  },
}

const List = (props: Props): React$Element<any> => {
  if (props.data.loading) {
    return <h1>Loading...</h1>
  }

  if (props.data.error) {
    return <h1>Error</h1>
  }

  return (
    <ul>
      {
        props.data.pokedex.pokemon.edges.map(
        (edge: Edge): React$Element<any> => <li key={edge.node.id}>{edge.node.name}</li>,
        )
      }
    </ul>
  )
}

export default graphql(MyQuery)(List)
