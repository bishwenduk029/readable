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
function receiveUpdatedPostVote(json) {
  return {
    type: UPDATE_POST_VOTE,
    updatedPost: json
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

export const ADD_NEW_POST  = 'ADD_NEW_POST';
export function newPostAdded(post) {
  return {
    type: ADD_NEW_POST,
    newPost: post
  }
}

export const UPDATED_POST = 'UPDATED_POST';
export function receiveUpdatedPost(post) {
  return {
    type: UPDATED_POST,
    updatedPost: post
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
      .then(json =>
        dispatch(receivePosts(json))
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
      .then(json => dispatch(receiveUpdatedPostVote(json)));
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
