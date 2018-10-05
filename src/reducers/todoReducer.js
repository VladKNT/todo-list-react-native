import ACTION from '../actions/ActionTypes';

const initialState = {
  todoList: [],
  loading: false,
  error: '',
  removeStatus: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_TODO_LIST_REQUESTING: {
      return {
        ...state,
        loading: true
      };
    }

    case ACTION.GET_TODO_LIST_SUCCESS: {
      return {
        ...state,
        todoList: action.todoList,
        loading: false
      };
    }

    case ACTION.GET_TODO_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }

    case ACTION.DELETE_TODO_LIST_REQUESTING: {
      return {
        ...state
      };
    }

    case ACTION.DELETE_TODO_LIST_SUCCESS: {
      return {
        ...state,
        removeStatus: action.status
      };
    }

    case ACTION.DELETE_TODO_LIST_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }
  }

  return state
}
