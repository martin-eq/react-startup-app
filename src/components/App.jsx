// @flow
import React, { PropTypes } from 'react'
import { gql, graphql } from 'react-apollo';

const MyQuery = gql`
  {
    todos {
      id,
      title
    }
  }
`

type Todo = {
  id: string,
  title: string,
}

type Props = {
  data: {
    loading: boolean,
    todos: ?Array<Todo>,
    error: any,
  }
}

const renderResult = (props: Props): React$Element => {
  if (props.data.error) {
    return <h1>Error</h1>
  }

  return (
    <ul>
      {
        !props.data.loading && props.data.todos &&
        props.data.todos.map(
          (todo: Todo): Todo[] => <li key={todo.id}>{todo.title}</li>,
        )
      }
    </ul>
  )
}

const MyComponent = (props: Props): React$Element => (
  <div>
    <h1>Todo List Example</h1>
    { renderResult(props) }
  </div>
)

export default graphql(MyQuery)(MyComponent)
