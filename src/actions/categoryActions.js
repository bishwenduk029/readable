import fetch from 'isomorphic-fetch';

export const REQUEST_CATEGORY = 'REQUEST_CATEGORY';
function requestCategories() {
  return {
    type: REQUEST_CATEGORY
  }
}

export const RECEIVE_CATEGORY= 'RECEIVE_CATEGORY';
function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORY,
    categories: json.categories,
  }
}

export function fetchCategories() {

  return function (dispatch) {

    dispatch(requestCategories())

    return fetch('http://localhost:5001/categories', { headers: { 'Authorization': 'bashu' }})
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>
        dispatch(receiveCategories(json))
      )
  }
}