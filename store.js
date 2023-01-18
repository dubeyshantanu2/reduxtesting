import {legacy_createStore as createStore} from 'redux';
import reducers from './reducers';

const initialStore = {
  todos: [],
};

export default function configureStore(initialState = initialStore) {
  return createStore(reducers, initialState);
}
