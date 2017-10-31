import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import api from '../middleware/api';

export default function configureStore(initialState) {

  let middleware = applyMiddleware();
  let enhancer;

  const sagaMiddleware = createSagaMiddleware();

  let middlewares = [require('redux-immutable-state-invariant')(), api, sagaMiddleware];
  middleware = applyMiddleware(...middlewares);

  if (process.env.NODE_ENV !== 'production') {
    let getDebugSessionKey = function () {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length) ? matches[1] : null;
    };

    enhancer = compose(

      // Middleware we want to use in development
      middleware,
      require('../containers/DevTools').default.instrument(),
      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
  } else {
    enhancer = compose(middleware);
  }

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
