import RequestHelper from './RequestHelper';
import TodoApi from '../api/TodoApi';

export default class TodoService {
  static async getTodoList() {
    const query = TodoApi.getTodoList();
    return await RequestHelper.graphqlRequest(query);
  }

  static async createTodoList(title) {
    const query = TodoApi.createTodoList(title);
    return await RequestHelper.graphqlRequest(query);
  }

  static async updateTodoList({ id, title }) {
    const query = TodoApi.updateTodoList(id, title);
    return await RequestHelper.graphqlRequest(query);
  }

  static async deleteTodoList(id) {
    const query = TodoApi.deleteTodoList(id);
    return await RequestHelper.graphqlRequest(query);
  }
}
