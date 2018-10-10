import gql from 'graphql-tag';

export const getTodoList = gql `
  query {
    getAllTodos {
      id
      title
      todoItems {
        id
        content
        complete
      }
    }
  }   
`;

export const createTodoList = gql `
  mutation createTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      todoItems {
        id
        content
        complete
      }
    }
  }
`;

export const updateTodoList = gql `
  mutation updateTodo($id: Int!, $title: String!) {
    updateTodo(id: $id, title: $title) {
      id
      title
    }
  }
`;

export const deleteTodoList = gql `
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;
