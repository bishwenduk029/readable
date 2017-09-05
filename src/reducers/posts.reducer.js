import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_NEW_POST,
  ADDING_POST,
  UPDATED_POST,
  UPDATE_POST_VOTE,
  UPDATE_SORT_BY
} from '../actions/postsAction';

function posts(
  state = {
    isFetching: false,
    isAdding: false,
    items: [],
    sortType: 'voteScore'
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    case ADDING_POST:
      return Object.assign({}, state, {
        isAdding: true
      });
    case ADD_NEW_POST:
      return Object.assign({}, state,{
        items: [...state.items, action.newPost],
        isAdding: false
      });
    case (UPDATE_POST_VOTE || UPDATED_POST):
      let temp = state.items.filter(elem => (elem.id !== action.updatedPost.id));
      return Object.assign({}, state, {
        items: [...temp, action.updatedPost]
      });
    case UPDATE_SORT_BY:
      return Object.assign({}, state,{
        sortType: action.sortType
      });
    default:
      return state;
  }
}

export default posts;