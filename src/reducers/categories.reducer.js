import {
  REQUEST_CATEGORY,
  RECEIVE_CATEGORY
} from '../actions/types';

function categories(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_CATEGORY:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CATEGORY:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categories
      });
    default:
      return state;
  }
}

export default categories;