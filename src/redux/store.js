import { createStore } from 'redux';
import rootReducer from './reducers';
import { preloadedState } from './reducers/game';

const configureStore = (preloadedState) => (
  createStore(
    rootReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const store = configureStore(preloadedState);

export default store;
