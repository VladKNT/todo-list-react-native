import { put, call, select } from 'redux-saga/effects';
import ACTION from '../actions/ActionTypes';
import TodoService from '../services/TodoService';
import _ from 'lodash';

export function* getTodoList(action) {
  try {
    yield put({ type: ACTION.GET_TODO_LIST_REQUESTING });

    const response = yield call(TodoService.getTodoList);
    const todoList = _.get(response, 'data.data.getAllTodos');

    yield put({ type: ACTION.GET_TODO_LIST_SUCCESS, todoList });
  } catch (error) {
    yield put({ type: ACTION.GET_TODO_LIST_ERROR, error: error.message })
  }
}