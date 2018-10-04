export default {
  getTodoList: `
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
  `
}