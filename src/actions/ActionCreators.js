import ACTION from "./ActionTypes";


// Todo list actions

export const createTodoList = (title) => {
  return {
    type: ACTION.CREATE_TODO_LIST,
    title
  }
};

export const updateTodoList = ({ id, title }) => {
  return {
    type: ACTION.UPDATE_TODO_LIST,
    id,
    title
  }
};

export const deleteTodoList = (id) => {
  return {
    type: ACTION.DELETE_TODO_LIST,
    id
  }
};

export const getTodoList = () => {
  return {
    type: ACTION.GET_TODO_LIST
  }
};

// Todo item action

export const createTodoItem = ({ todoId, content }) => {
  return {
    type: ACTION.CREATE_TODO_ITEM,
    todoId,
    content
  }
};

export const updateTodoItem = ({ id, content, complete }) => {
  return {
    type: ACTION.UPDATE_TODO_ITEM,
    id,
    content,
    complete
  }
};

export const deleteTodoItem = (id) => {
  return {
    type: ACTION.DELETE_TODO_ITEM,
    id
  }
};