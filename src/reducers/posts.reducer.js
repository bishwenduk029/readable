import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  UPDATE_POST_VOTE,
  UPDATE_SORT_BY
} from '../actions/postsAction';

function posts(
  state = {
    isFetching: false,
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
        items: action.posts.sort((elem1, elem2) => elem2[state.sortType] - elem1[state.sortType])
      })
    case UPDATE_POST_VOTE:
      let temp = state.items.filter(elem => (elem.id !== action.newPost.id));
      return Object.assign({}, state, {
        items: [...temp, action.newPost].sort((elem1, elem2) => elem2[state.sortType] - elem1[state.sortType])
      });
    case UPDATE_SORT_BY:
      return Object.assign({}, state,{
        items: state.items.sort((elem1, elem2) => elem2[action.sortType] - elem1[action.sortType]),
        sortType: action.sortType
      });
    default:
      return state;
  }
}

export default posts;