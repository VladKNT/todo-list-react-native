import RequestHelper from './RequestHelper';
import api from '../api/todo';

export default class TodoService {
  static async getTodoList() {
    return await RequestHelper.graphqlRequest(api.getTodoList);
  }
}