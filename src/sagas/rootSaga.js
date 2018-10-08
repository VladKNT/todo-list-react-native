import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/ActionTypes';
import * as todoSaga from './todoSaga';
import * as todoItemSaga from './todoItemSaga';

export default function* rootSaga() {
  yield takeLatest(ACTION.GET_TODO_LIST, todoSaga.getTodoList);
  yield takeLatest(ACTION.CREATE_TODO_LIST, todoSaga.createTodoList);
  yield takeLatest(ACTION.UPDATE_TODO_LIST, todoSaga.updateTodoList);
  yield takeLatest(ACTION.DELETE_TODO_LIST, todoSaga.deleteTodoList);

  yield takeLatest(ACTION.CREATE_TODO_ITEM, todoItemSaga.createTodoItem);
  yield takeLatest(ACTION.UPDATE_TODO_ITEM, todoItemSaga.updateTodoItem);
  yield takeLatest(ACTION.DELETE_TODO_ITEM, todoItemSaga.deleteTodoItem);
}
