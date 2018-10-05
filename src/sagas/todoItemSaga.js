import { put, call, select } from 'redux-saga/effects';
import ACTION from '../actions/ActionTypes';
import TodoItemService from '../services/TodoItemService';

export function* createTodoItem(action) {
  try {
    yield put({ type: ACTION.CREATE_TODO_ITEM_REQUESTING });
    const response = yield call(TodoItemService.createTodoItem, action);

    yield put({ type: ACTION.CREATE_TODO_ITEM_SUCCESS });
  } catch (error) {
    console.info(error);
    yield put({ type: ACTION.CREATE_TODO_ITEM_ERROR, error: error.message })
  }
}

export function* updateTodoItem(action) {
  try {
    yield put({ type: ACTION.UPDATE_TODO_LIST_REQUESTING });
    const response = yield call(TodoItemService.updateTodoItem, action);

    yield put({ type: ACTION.UPDATE_TODO_LIST_SUCCESS });
  } catch (error) {
    console.info(error);
    yield put({ type: ACTION.UPDATE_TODO_LIST_ERROR, error: error.message })
  }
}
