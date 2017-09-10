import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_NEW_POST,
  ADDING_POST,
  UPDATED_POST,
  UPDATE_POST_VOTE,
  UPDATE_SORT_BY,
  ADD_COMMENTS_TO_POST,
  REQUEST_COMMENT_UPDATE,
  ADDING_COMMENT,
  ADDED_NEW_COMMENT,
  UPDATED_COMMENT_VOTE,
  POST_DELETED,
  COMMENT_DELETED
} from '../actions/postsAction';

function posts(
  state = {
    isFetching: false,
    isAdding: false,
    items: [],
    sortType: 'voteScore',
    commentToEdit: ''
  },
  action
) {
  let tempList;
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
      tempList = state.items.filter(elem => (elem.id !== action.updatedPost.id));
      return Object.assign({}, state, {
        items: [...tempList, action.updatedPost]
      });
    case ADD_COMMENTS_TO_POST:
      tempList = state.items.filter(elem => (elem.id !== action.post.id));
      return Object.assign({}, state, {
        items: [...tempList, action.post]
      });
    case UPDATE_SORT_BY:
      return Object.assign({}, state,{
        sortType: action.sortType
      });
    case REQUEST_COMMENT_UPDATE:
      return Object.assign({}, state, {
        commentToEdit: action.commentToEdit
      });
    case ADDING_COMMENT:
      return Object.assign({}, state, {
        isAdding: true
      });
    case ADDED_NEW_COMMENT:
      return Object.assign({}, state ,{
        isAdding: false
      });
    case UPDATED_COMMENT_VOTE:
      return Object.assign({}, state, {
        items: state.items.map(item => {
          if (item.id === action.newComment.parentId) {
            let tempComments = item.comments.filter(comment => (comment.id !== action.newComment.id));
            item.comments = [...tempComments, action.newComment]
          }
          return item;
        })
      });
    case POST_DELETED:
      return Object.assign({}, state, {
        items: state.items.filter(item => (item.id !== action.deletedPost.id))
      });
    case COMMENT_DELETED:
      return Object.assign({}, state, {
        items: state.items.map(item => {
          if (item.id === action.deletedComment.parentId) {
            item.comments = item.comments.filter(comment => (comment.id !== action.deletedComment.id));
          }
          return item;
        })
      });
    default:
      return state;
  }
}

export default posts;