import axios from 'axios';
import URLS from '../constants/urls';

export default class RequestHelper {
  static async graphqlRequest(query) {
    return await axios.post(URLS.API_URL, { query: query });
  }
}
