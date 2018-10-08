import { put, call, select } from 'redux-saga/effects';
import ACTION from '../actions/ActionTypes';
import TodoItemService from '../services/TodoItemService';
import { getTodoList } from "./todoSaga";
import nav from '../services/NavigationService';

export function* createTodoItem(action) {
  try {
    yield put({ type: ACTION.CREATE_TODO_ITEM_REQUESTING });
    const response = yield call(TodoItemService.createTodoItem, action);

    if (response) {
      yield call(getTodoList);
      nav.navigator._navigation.goBack();
    }

    yield put({ type: ACTION.CREATE_TODO_ITEM_SUCCESS });
  } catch (error) {
    console.info(error);
    yield put({ type: ACTION.CREATE_TODO_ITEM_ERROR, error: error.message })
  }
}

export function* updateTodoItem(action) {
  try {
    yield put({ type: ACTION.UPDATE_TODO_ITEM_REQUESTING });
    const response = yield call(TodoItemService.updateTodoItem, action);

    if (response) {
      yield call(getTodoList);
      nav.navigator._navigation.goBack();
    }

    yield put({ type: ACTION.UPDATE_TODO_ITEM_SUCCESS });
  } catch (error) {
    console.info(error);
    yield put({ type: ACTION.UPDATE_TODO_ITEM_ERROR, error: error.message })
  }
}

export function* deleteTodoItem(action) {
  try {
    yield put({ type: ACTION.DELETE_TODO_ITEM_REQUESTING });
    const response = yield call(TodoItemService.deleteTodoItem, action.id);

    if (response) {
      yield call(getTodoList);
    }

    yield put({ type: ACTION.DELETE_TODO_ITEM_SUCCESS });
  } catch (error) {
    console.info(error);
    yield put({ type: ACTION.DELETE_TODO_ITEM_ERROR, error: error.message })
  }
}
