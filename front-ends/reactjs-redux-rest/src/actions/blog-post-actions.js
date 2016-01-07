import sweetalert from 'sweetalert';
import * as constants from '../constants';
import { checkStatus, parseJSON, api, tokenize, dispatchJSONErrors } from '../utils/functions';
import history from '../utils/history';

/**
 * Loads all posts
 *
 * @returns {Promise}
 */
export function getPosts () {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api(`/posts`), tokenize({
      method: 'get',
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: constants.POSTS_LOADED,
        payload: {posts: data.posts },
      });
      dispatch({
        type: constants.APPLICATION_LOADED,
      });
    })
    .catch((error) => {
      dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
    });
  };
}

/**
 * Loads a single blog post
 *
 * @param url_path
 * @returns {Promise}
 */
export function loadPostByUrl(url_path) {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api('/posts?url_path='+url_path), tokenize({
      method: 'get',
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: constants.SINGLE_POST_LOADED,
        payload: {singlePost: data.post},
      });
      dispatch({
        type: constants.APPLICATION_LOADED,
      });
    })
    .catch((error) => {
      dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
    });
  };
}

export function getAuthorById(id) {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api('/users/' + id), tokenize({
      method: 'get',
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: constants.SINGLE_AUTHOR_LOADED,
        payload: {singleAuthor: data.user},
      });
      dispatch({
        type: constants.APPLICATION_LOADED,
      });
    })
    .catch((error) => {
      dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
    });
  };
}