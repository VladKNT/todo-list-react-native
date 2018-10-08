import { put, call, select } from 'redux-saga/effects';
import ACTION from '../actions/ActionTypes';
import TodoService from '../services/TodoService';
import _ from 'lodash';
import nav from '../services/NavigationService';

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

export function* createTodoList(action) {
  try {
    yield put({ type: ACTION.CREATE_TODO_LIST_REQUESTING });

    const response = yield call(TodoService.createTodoList, action.title);

    if (response) {
      yield call(getTodoList);
      nav.navigator._navigation.goBack();
    }

    yield put({ type: ACTION.CREATE_TODO_LIST_SUCCESS });
  } catch (error) {
    console.info(error);
    yield put({ type: ACTION.CREATE_TODO_LIST_ERROR, error: error.message })
  }
}

export function* updateTodoList(action) {
  try {
    yield put({ type: ACTION.UPDATE_TODO_LIST_REQUESTING });

    const response = yield call(TodoService.updateTodoList, action);

    if (response) {
      yield call(getTodoList);
      nav.navigator._navigation.goBack();
    }

    yield put({ type: ACTION.UPDATE_TODO_LIST_SUCCESS });
  } catch (error) {
    console.info(error);
    yield put({ type: ACTION.UPDATE_TODO_LIST_ERROR, error: error.message })
  }
}

export function* deleteTodoList(action) {
  try {
    yield put({ type: ACTION.DELETE_TODO_LIST_REQUESTING });

    const response = yield call(TodoService.deleteTodoList, action.id);

    if (response) {
      yield call(getTodoList);
    }

    yield put({ type: ACTION.DELETE_TODO_LIST_SUCCESS, status: response});
  } catch (error) {
    yield put({ type: ACTION.DELETE_TODO_LIST_ERROR, error: error.message })
  }
}