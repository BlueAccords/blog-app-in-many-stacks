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
 * Loads all tags
 *
 * @returns {Promise}
 */
export function getTags () {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api(`/tags`), tokenize({
      method: 'get',
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: constants.TAGS_LOADED,
        payload: {tags: data.tags },
      });
    })
    .catch((error) => {
      dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
    });
  };
}


/**
 * Loads a set of posts given tag_text
 *
 * @param tag_text
 * @returns {Promise}
 */
export function getPostsByTag(tag_text) {
  let tagId = null;
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return getTagByTagText(tag_text)
    .then((data) => {
      tagId = data.tag.id;

      return fetch(api('/tags/'+tagId+'/posts'), tokenize({
        method: 'get',
      }))
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        dispatch({
          type: constants.QUERIED_POSTS_LOADED,
          payload: { posts: data.posts },
        });
        dispatch({
          type: constants.APPLICATION_LOADED,
        });
      })
      .catch((error) => {
        dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
      });

    })
    .catch((error) => {
      dispatchJSONErrors(dispatch, constants.APPLICATION_ERRORS, error);
    });
  };
}


/**
 * Loads a single tag from queried tag text - NOT A PUBLIC FUNCTION, INTERNAL TO POST-ACTIONS
 *
 * @param tag_text
 * @returns {Promise}
 */
function getTagByTagText(tag_text) {
  return fetch(api('/tags?text='+tag_text), tokenize({
    method: 'get',
  }))
  .then(checkStatus)
  .then(parseJSON)
  .then((data) => {
    return data;
  })
  .catch((error) => {
    return error;
  });
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

export function getCommentsByPostId(postId) {
  return (dispatch) => {
    dispatch({
      type: constants.APPLICATION_LOADING,
    });

    return fetch(api('/posts/' + postId + '/comments'), tokenize({
      method: 'get',
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: constants.COMMENTS_LOADED,
        payload: {comments: data.comments},
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