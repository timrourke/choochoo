import {
  applyMiddleware,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import chooChooApp from './reducers';

const middleware = applyMiddleware(thunk);

export const store = createStore(chooChooApp, middleware);