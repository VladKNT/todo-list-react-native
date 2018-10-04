import { takeLatest } from 'redux-saga';
import ACTION from '../actions/ActionTypes';
import * as todoSaga from './todoSaga';

export default function* rootSaga() {
  yield takeLatest(ACTION.GET_TODO_LIST, todoSaga.getTodoList);
}
