import { applyMiddleware, compose as composeRedux, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas/rootSaga';

let compose = composeRedux;
if (__DEV__) {
  compose = require('redux-devtools-extension').composeWithDevTools;
}

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const middlewares = [ sagaMiddleware ];
  const enhancers = [ applyMiddleware(...middlewares) ];
  const store = createStore(
    reducers,
    compose(...enhancers)
  );

  // Extensions
  sagaMiddleware.run(rootSaga, store.dispatch);

  // make dispatch available in services
  // GLOBAL.dispatch = store.dispatch;

  return store;
}

export default configureStore;
