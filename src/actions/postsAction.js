import fetch from 'isomorphic-fetch';
import Axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
  }
}

export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE';
function receiveUpdatedPostVote(newPost, oldPost) {
  return {
    type: UPDATE_POST_VOTE,
    updatedPost: Object.assign({},newPost,{
      comments: oldPost.comments
    })
  }
}

export const UPDATED_COMMENT_VOTE = 'UPDATED_COMMENT_VOTE';
function receiveUpdatedCommentVote(newComment, oldComment) {
  return {
    type: UPDATED_COMMENT_VOTE,
    newComment
  }
}

export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';
export function updateSortByParam(value) {
  return {
    type: UPDATE_SORT_BY,
    sortType: value
  }
}

export const ADDING_POST = 'ADDING_POST';
export function requestPostAddition() {
  return {
    type: ADDING_POST
  }
}

export const ADDING_COMMENT = 'ADDING_COMMENT';
export function requestCommentAddition() {
  return {
    type: ADDING_COMMENT
  }
}

export const ADD_NEW_POST  = 'ADD_NEW_POST';
export function newPostAdded(post) {
  return {
    type: ADD_NEW_POST,
    newPost: post
  }
}

export const ADDED_NEW_COMMENT  = 'ADDED_NEW_COMMENT';
export function newCommentAdded(comment) {
  return {
    type: ADDED_NEW_COMMENT,  
  };
}

export const UPDATED_POST = 'UPDATED_POST';
export function receiveUpdatedPost(post) {
  return {
    type: UPDATED_POST,
    updatedPost: post
  }
}

export const ADD_COMMENTS_TO_POST = 'ADD_COMMENTS_TO_POST';
function modifyPostWithComments(comments, post) {
  post.comments = comments;
  return {
    type: ADD_COMMENTS_TO_POST,
    post
  }
}

export const REQUEST_COMMENT_UPDATE = 'REQUEST_COMMENT_UPDATE';
export function requestCommentUpdate(comment) {
  return {
    type: REQUEST_COMMENT_UPDATE,
    commentToEdit: comment
  }
}

export const POST_DELETED = 'POST_DELETED';
export function postDeleted(deletedPost) {
  return {
    type: POST_DELETED,
    deletedPost
  }
}

export const COMMENT_DELETED = 'COMMENT_DELETED';
export function commentDeleted(deletedComment) {
  return {
    type: COMMENT_DELETED,
    deletedComment
  }
}

export function fetchPosts() {

  return function (dispatch) {

    dispatch(requestPosts())

    return fetch('http://localhost:5001/posts', { headers: { 'Authorization': 'bashu' }})
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => (dispatch(receivePosts(json)))
      )
  }
}

export function updatePostVote(post, vote) {
  return function(dispatch) {
    const url = 'http://localhost:5001/posts/' + post.id.toString();
    return Axios.post(url, {option: vote}, {headers: { 'Authorization': 'bashu' }})
      .then(
        resp => resp.data,
      )
      .catch(error => {throw(error);})
      .then(json => dispatch(receiveUpdatedPostVote(json, post)));
  }
}

export function updateCommentVote(comment, vote) {
  return function(dispatch) {
    const url = 'http://localhost:5001/comments/' + comment.id.toString();
    return Axios.post(url, {option: vote}, {headers: { 'Authorization': 'bashu' }})
      .then(
        resp => resp.data,
      )
      .catch(error => {throw(error);})
      .then(json => dispatch(receiveUpdatedCommentVote(json, comment))); 
  }
}

export function editPost(post) {
  return function(dispatch) {
    const url = 'http://localhost:5001/posts/' + post.id.toString();
    return Axios.put(url,{title: post.title, body: post.body}, {headers: { 'Authorization': 'bashu' }})
      .then(
        resp => resp.data,
      )
      .catch(error => {throw(error);})
      .then(json => dispatch(receiveUpdatedPost(json)));
  }
}

export function  updateComment(newComment) {
  return function(dispatch) {
    const url = 'http://localhost:5001/comments/' + newComment.id.toString();
    return Axios.put(url,{timestamp: Date.now(), body: newComment.body}, {headers: { 'Authorization': 'bashu' }});
  }
}

export function addNewPost(post) {
  return function (dispatch) {

    dispatch(requestPostAddition());
    const url = 'http://localhost:5001/posts';
      return Axios.post(url, {
        id: post.id,
        timestamp: post.timestamp,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category
      }, {headers: { 'Authorization': 'bashu' }})
        .then(resp => resp.data)
        .catch(error => {throw(error);})
        .then(json => dispatch(newPostAdded(post)));
  }
}

export function addNewComment(comment) {
  return function (dispatch) {

    dispatch(requestCommentAddition());
    const url = 'http://localhost:5001/comments';
      return Axios.post(url, {
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId
      }, {headers: { 'Authorization': 'bashu' }})
        .then(resp => resp.data)
        .catch(error => {throw(error);})
        .then(json => dispatch(newCommentAdded(json)));
  }
}

export function getCommentsForPost(post) {
  return function(dispatch) {
    return Axios.get('http://localhost:5001/posts/' + post.id+"/comments",{headers: { 'Authorization': 'bashu' }})
      .then(resp => resp.data)
      .catch(error => {throw(error);})
      .then(json => dispatch(modifyPostWithComments(json, post)));
  }
}

export function deletePost(post) {
  return function(dispatch) {
    return Axios.delete('http://localhost:5001/posts/' + post.id.toString(), {headers: { 'Authorization': 'bashu' }})
      .then(resp => resp.data)
      .catch(error => {throw(error);})
      .then(json => dispatch(postDeleted(post)));
  }
}

export function deleteComment(comment) {
  return function(dispatch) {
    return Axios.delete('http://localhost:5001/comments/' + comment.id.toString(), {headers: { 'Authorization': 'bashu' }})
      .then(resp => resp.data)
      .catch(error => {throw(error);})
      .then(json => dispatch(commentDeleted(comment)));
  }
}
