import sweetalert from 'sweetalert';
import * as constants from '../constants';
import { checkStatus, parseJSON, api, tokenize, dispatchJSONErrors, logoutIfUnauthorized } from '../utils/functions';
import history from '../utils/history';

/**
 * Logs in a user then redirects
 *
 * @param {object} data
 * @param {string} redirect
 * @returns {Promise}
 */
export function login (data, redirect) {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api(`/sign-in`), tokenize({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      // make sure user is valid and that we received a valid response from api
      if (data.user && data.token) {
        dispatch({
          type: constants.USER_LOADED,
          payload: {user: data.user, token: data.token},
        });

        // Can be used to navigate to a new route
        if (redirect) {
          redirect();
        }
      } else {
        console.log('malformed data: ', data);
      }
    })
    .catch((errors) => {
      dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, errors);
    });
  };
}

/**
 * Logout a user
 *
 * @param {string} redirect - An optional URL to redirect to
 * @returns {Promise}
 */
export function logout (redirect) {
  return (dispatch) => {
    dispatch({
      type: constants.LOGGED_OUT,
    });

    // Can be used to navigate to a new route
    if (redirect) {
      redirect();
    }
  };
}

/**
 * Registers a user then redirects
 *
 * @param {object} data
 * @param {string} redirect - An optional URL to redirect to
 * @returns {Promise}
 */
export function register (data, redirect) {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api('/users'), tokenize({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: constants.REGISTERED,
      });
      sweetalert({
        title: 'Success',
        type: 'success',
        text: 'Your account was created successfully. You may now log in.',
      });
      history.pushState(null, `/`);
    })
    .catch((error) => {
      dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
    });
  };
}

/**
 * Loads user data
 *
 * @returns {Promise}
 */
export function loadUser () {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api(`/users`), tokenize({
      method: 'get',
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      // make sure user is valid and that we received a valid response from api
      if (data.user && data.token){
        dispatch({
          type: constants.USER_LOADED,
          payload: {user: data.user, token: data.token},
        });
      }
    })
    .catch((error) => {
      logoutIfUnauthorized(dispatch, error.response.status);
    });
  };
}

/**
 * Updates a user
 *
 * @param {object} data - object containing user fields to update
 * @param {string} userId - the user id of the user we want to update
 * @returns {Promise}
 */
export function updateUser (data, userId) {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    console.log('will update: ', data, userId);

    if (userId){
      return fetch(api(`/users/` + userId), tokenize({
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }))
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        // make sure user exists - we need a proper api response to continue
        if (data.user && data.token) {
          dispatch({
            type: constants.USER_LOADED,
            payload: {user: data.user, token: data.token},
          });
          sweetalert({
            title: 'Success',
            type: 'success',
            text: 'Your account was successfully updated',
          });
        }
      })
      .catch((error) => {
        if(!logoutIfUnauthorized(dispatch, error.response.status)) {
          dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
        }
      });
    } else {
      return null;
    }
  };
}

/**
 * Loads user data only if the data is not already loaded.
 *
 * @returns {Promise}
 */
export function loadUserIfNeeded () {
  return (dispatch, getState) => {
    let state = getState();
    if(!state.application.user) {
      dispatch(loadUser());
    }
  };
}


/**
 * Deletes selected user given the user id
 *
 * @param {string} userId
 * @returns {Promise}
 */
export function deleteUser(userId) {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api('/users/' + userId), tokenize({
      method: 'delete',
      body: JSON.stringify(userId),
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: constants.LOGGED_OUT,
      });
      dispatch(logout());
    })
    .catch((error) => {
      dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
    });
  };
}


