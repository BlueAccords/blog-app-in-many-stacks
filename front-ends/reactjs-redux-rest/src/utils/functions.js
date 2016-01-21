import * as storage from '../utils/storage';
import * as constants from '../constants';

/**
 * Filtration for a response
 *
 * @param {object} response
 * @returns {object}
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status >=500) {
    let error;
    error = new Error(response.status);
    error.response = {errors: {general: 'Unknown error'}};

    throw error;
  } else {
    let error;
    error = new Error(response.statusText);
    error.response = response;

    throw error;
  }
}

/**
 * Log the current user out if he submits a request that returns unauthorized
 *
 * @param {function} dispatch the dispatch function needed for redux
 * @param {string} errorCode the error code to check against
 * @returns {boolean}
 */
export function logoutIfUnauthorized(dispatch, errorCode) {
  if(errorCode === 401) {
    dispatch({
      type: constants.LOGGED_OUT,
    });

    return true;
  } else {
    return false;
  }
}

/**
 * Returns the response data as json
 *
 * @param {object} response
 * @returns {object}
 */
export function parseJSON(response) {
  return response.json();
}

/**
 * Returns the path given the current API URL
 *
 * @param {string} path
 * @returns {string}
 */
export function api(path) {
  //Could be a a different API location in the future.
  return `${window.API_URL}${path}`;
}

/**
 * Returns the given object with the token added
 *
 * @param {object} obj the object to modify and return
 * @returns {object} the object with the authorization data in the header
 */
export function tokenize(obj){
  obj.headers = obj.headers || {};
  obj.headers['Authorization'] = `Bearer: ${storage.get('token')}`;

  return obj;
}

/**
 * Dispatches the errors
 *
 * @param {function} dispatch - the dispatch function to call
 * @param {string} ACTION - the action to dispatch
 * @param {object} error - the error
 * @returns {void}
 */
export function dispatchJSONErrors(dispatch, ACTION, error) {
  if(error.response.json) {
    // For handling proper requests
    error.response.json().then((data) => {
      dispatch({
        type: ACTION,
        payload: {errors: data.errors},
      });
    });
  } else {
    // For handling unexpected 500 errors
    dispatch({
      type: ACTION,
      payload: {errors: error.response.errors},
    });
  }
}
