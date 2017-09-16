import fetch from 'isomorphic-fetch';
import Axios from 'axios';

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_NEW_POST,
  ADDING_POST,
  EDITING_POST,
  UPDATED_POST,
  UPDATE_POST_VOTE,
  UPDATE_SORT_BY,
  ADD_COMMENTS_TO_POST,
  EDITING_COMMENT,
  EDIT_COMMENT_SUCCESS,
  ADDING_COMMENT,
  ADDED_NEW_COMMENT,
  UPDATED_COMMENT_VOTE,
  POST_DELETED,
  COMMENT_DELETED
} from './types';

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
  }
}

function receiveUpdatedPostVote(newPost, oldPost) {
  return {
    type: UPDATE_POST_VOTE,
    updatedPost: Object.assign({},newPost,{
      comments: oldPost.comments
    })
  }
}

function receiveUpdatedCommentVote(newComment, oldComment) {
  return {
    type: UPDATED_COMMENT_VOTE,
    newComment
  }
}

export function updateSortByParam(value) {
  return {
    type: UPDATE_SORT_BY,
    sortType: value
  }
}

export function requestPostAddition() {
  return {
    type: ADDING_POST
  }
}

export function requestCommentAddition() {
  return {
    type: ADDING_COMMENT
  }
}

export function newPostAdded(post) {
  return {
    type: ADD_NEW_POST,
    newPost: post
  }
}

export function newCommentAdded(comment) {
  return {
    type: ADDED_NEW_COMMENT,  
    comment
  };
}

function editingPost() {
  return ({
    type: EDITING_POST
  });
}

export function receiveUpdatedPost(post) {
  return {
    type: UPDATED_POST,
    updatedPost: post
  }
}

function modifyPostWithComments(comments, post) {
  post.comments = comments;
  return {
    type: ADD_COMMENTS_TO_POST,
    post
  }
}

export function postDeleted(deletedPost) {
  return {
    type: POST_DELETED,
    deletedPost
  }
}

export function commentDeleted(deletedComment) {
  return {
    type: COMMENT_DELETED,
    deletedComment
  }
}

function editingComment() {
  return {
    type: EDITING_COMMENT
  }
}

function updatedComment() {
  return {
    type: EDIT_COMMENT_SUCCESS
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
    dispatch(editingPost());
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
    dispatch(editingComment());
    const url = 'http://localhost:5001/comments/' + newComment.id.toString();
    return Axios.put(url,{timestamp: Date.now(), body: newComment.body}, {headers: { 'Authorization': 'bashu' }})
      .then(resp => resp.data)
      .catch(error => {throw(error);})
      .then(json => dispatch(updatedComment()))
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
