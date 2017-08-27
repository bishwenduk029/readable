import { combineReducers } from 'redux';
import posts from './posts.reducer.js';
import categories from './categories.reducer.js';

const rootReducer = combineReducers({
  posts,
  categories
});

export default rootReducer;