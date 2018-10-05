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
}
