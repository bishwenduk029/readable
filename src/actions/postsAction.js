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
    newPost: json
  }
}

export const UPDATE_SORT_BY = 'UPDATE_SORT_BY';
export function updateSortByParam(value) {
  return {
    type: UPDATE_SORT_BY,
    sortType: value
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