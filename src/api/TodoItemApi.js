export default class TodoItemApi {
  static createTodoItem(todoId, content) {
    return `
      mutation {
        createTodoItem(todoId: ${todoId}, content: "${content}") {
          id
          content
          complete 
        }
      } 
   `
  }

  static updateTodoItem(id, content, complete) {
    return `
      mutation {
        updateTodoItem(id: ${id}, content: "${content}", complete: ${complete}) {
          id
          content
          complete 
        }
      } 
   `
  }

  static deleteTodoItem(id) {
    return `
      mutation {
        deleteTodoItem(id: ${id})
      } 
   `
  }
}
