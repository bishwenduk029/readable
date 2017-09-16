import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_NEW_POST,
  ADDING_POST,
  UPDATED_POST,
  UPDATE_POST_VOTE,
  UPDATE_SORT_BY,
  ADD_COMMENTS_TO_POST,
  EDITING_COMMENT,
  ADDING_COMMENT,
  ADDED_NEW_COMMENT,
  EDIT_COMMENT_SUCCESS,
  UPDATED_COMMENT_VOTE,
  POST_DELETED,
  COMMENT_DELETED,
  EDITING_POST
} from '../actions/types';

function posts(
  state = {
    isFetching: false,
    isAdding: false,
    items: [],
    sortType: 'voteScore',
    isEditing: false
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
        items: action.posts.filter(item => (!item.deleted))
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
    case EDITING_POST:
      return Object.assign({}, state,{
        isEditing: true
      });
    case (UPDATE_POST_VOTE):
      tempList = state.items.filter(elem => (elem.id !== action.updatedPost.id));
      return Object.assign({}, state, {
        items: [...tempList, action.updatedPost]
      });
    case (UPDATED_POST):
      return Object.assign({}, state, {
        isEditing: false
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
    case EDITING_COMMENT:
      return Object.assign({}, state, {
        isEditing: true
      });
    case EDIT_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        isEditing: false
      });
    case ADDING_COMMENT:
      return Object.assign({}, state, {
        isAdding: true
      });
    case ADDED_NEW_COMMENT:
      return Object.assign({}, state ,{
        isAdding: false,
        items: state.items.map(item => {
          if (item.id === action.comment.parentId) {
            item.comments = item.comments ? [...item.comments, action.comment] : [].push(action.comment);
          }
          return item;
        })
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