import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import Reducer from './reducers';

const store = createStore(Reducer, 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
applyMiddleware(thunkMiddleware));
export default store;

