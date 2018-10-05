export default class TodoApi {
  static getTodoList() {
    return  `
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

  static createTodoList(title) {
    return `
      mutation {
        createTodo(title: "${title}") {
          id
          title 
        }
      } 
   `
  }

  static updateTodoList(id, title) {
    return `
      mutation {
        updateTodo(id: ${id}, title: "${title}") {
          id
          title 
        }
      } 
   `
  }

  static deleteTodoList(id) {
    return `
      mutation {
        deleteTodo(id: ${id})  
      } 
   `
  }
}
