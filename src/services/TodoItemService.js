import RequestHelper from './RequestHelper';
import TodoItemApi from '../api/TodoItemApi';

export default class TodoService {
  static async createTodoItem({ todoId, content }) {
    const query = TodoItemApi.createTodoItem(todoId, content);
    return await RequestHelper.graphqlRequest(query);
  }

  static async updateTodoItem({ id, content, complete }) {
    const query = TodoItemApi.updateTodoItem(id, content, complete);
    return await RequestHelper.graphqlRequest(query);
  }

  static async deleteTodoItem(id) {
    const query = TodoItemApi.deleteTodoItem(id);
    return await RequestHelper.graphqlRequest(query);
  }
}
