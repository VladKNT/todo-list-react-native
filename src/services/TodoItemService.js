import RequestHelper from './RequestHelper';
import TodoItemApi from '../api/TodoItemApi';

export default class TodoService {
  static async createTodoItem({ todoId, content }) {
    const query = TodoItemApi.createTodoItem(todoId, content);
    return await RequestHelper.graphqlRequest(query);
  }
}
