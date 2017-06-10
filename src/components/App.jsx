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
`;

type Todo = {
  id: string,
  title: string,
}

type Props = {
  data: {
    loading: boolean,
    todos: ?Array<Todo>
  }
}

const MyComponent = (props: Props): React$Element => (
  <div>
    <ul>
      {
        !props.data.loading &&
        props.data.todos.map(
          (todo: Todo): Todo[] => <li key={todo.id}>{todo.title}</li>,
        )
      }
    </ul>
  </div>
)

MyComponent.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })),
  }).isRequired,
}

export default graphql(MyQuery)(MyComponent);
