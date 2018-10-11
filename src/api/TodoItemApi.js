import gql from 'graphql-tag';

export const createTodoItem = gql `
  mutation createTodoItem($todoId: Int!, $content: String!) {
    createTodoItem(todoId: $todoId, content: $content) {
      id
      content
      complete 
      todoId
    }
  }
`;

export const updateTodoItem = gql `
  mutation updateTodoItem($id: Int!, $content: String, $complete: Boolean) {
    updateTodoItem(id: $id, content: $content, complete: $complete) {
      id
      content
      complete
      todoId
    }
  }
`;

export const deleteTodoItem = gql `
  mutation deleteTodoItem($id: Int!) {
    deleteTodoItem(id: $id) {
      id
      todoId
    }
  }
`;

export const todoItemSaved = gql `
  subscription {
    todoItemSaved {
      id
      content
      complete
      todoId
    }
  }
`;
export const todoItemDeleted = gql `
  subscription {
    todoItemDeleted {
      id
      todoId
    }
  }
`;
